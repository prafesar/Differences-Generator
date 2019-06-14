import program from 'commander';
import _ from 'lodash';
import parseFile from './parsers';
import { version } from '../package.json';

const nodeActions = [
  {
    type: 'unchanged',
    check: (nodeBefore, nodeAfter, key) => _.has(nodeBefore, key)
      && _.has(nodeAfter, key) && (nodeBefore[key] === nodeAfter[key]
      || (_.isObject(nodeBefore[key]) && _.isObject(nodeAfter[key]))),
    // valueBefore Or Children
    action: (node, key) => {
      if (_.isObject(node[key])) {
        node.children = [];
      } else {
        node.valueBefore = nodeBefore[key];
      }
      return node;
    }
  },
  {
    type: 'updated',
    check: (nodeBefore, nodeAfter, key) => _.has(nodeBefore, key) && _.has(nodeAfter, key)
      && (nodeBefore[key] !== nodeAfter[key] || (_.isObject(nodeBefore[key]) !== _.isObject(nodeAfter[key]))),
    // valueBefore, valueAfter
    action: (node, key) => {
      node.valueBefore = nodeBefore[key];
      node.valueAfter = nodeAfter[key];
      return node;
    },
  },
  {
    type: 'removed',
    check: (nodeBefore, nodeAfter, key) => _.has(nodeBefore, key) && !_.has(nodeAfter, key),
    // valueBefore or Stringify
    action: (node, key) => {
      node.valueBefore = nodeBefore[key];
      return node;
    }
  },
  {
    type: 'added',
    check: (nodeBefore, nodeAfter, key) => !_.has(nodeBefore, key) && _.has(nodeAfter, key),
    // valueAfter or Stringify
    action: (node, key) => {
      node.valueAfter = nodeAfter[key];
      return node;
    },
  },
];

const getNodeActions = (nodeBefore, nodeAfter, key) => nodeActions
  .find(({ check }) => check(nodeBefore, nodeAfter, key));

const buildAstThree = (pathBefore, pathAfter) => {
  const readDateBefore = parseFile(pathBefore);
  const readDateAfter = parseFile(pathAfter);
  const acc = [];
  const iter = (dateBefore, dateAfter, pathAcc) => {
    const keys = Array.from(
      new Set(Object.keys(dateBefore)
        .concat(Object.keys(dateAfter))),
    );
    keys.forEach(key => {
      const { action, type } = getNodeActions(dateBefore, dateAfter, key);
      const node = { key, type };
      node.path = [...pathAcc, key];
      const nodeWhithDate = action(node, key);
      if (nodeWhithDate.children) {
        nodeWhithDate.children = nodeWhithDate.children
          .concat(iter(dateBefore[key], dateAfter[key], node.path));
      }
      acc.push(nodeWhithDate);
    });
    return acc;
  };
  return iter(readDateBefore, readDateAfter, []);
};

const stringify = (obj, level) => {
  const indent = ' '.repeat(level * 2);
  const startAcc = '';
  Object.keys(obj).reduce((acc, key) => {
    const str = _.isObject(obj[key]) ? `${indent}  ${key}: {\n${stringify(obj[key], level + 1)}${indent}\n`
      : `${indent}  ${key}: ${obj[key]}\n`;
    return acc.concat(str);
  }, startAcc);
};

const actionNodeRender = [
  {
    type: 'unchanged', // obj - obj, value - value
    content: (node, level) => {
      const indent = ' '.repeat(level * 2);
      return _.isObject(node.valueBefore) ? `${indent}  ${node.key}: ` // + children
        : `${indent}  ${node.key}: ${node.valueBefore}\n`
    },
  },
  {
    type: 'updated', // obj -> value, value -> obj,
    content: (node, level) => {
      const indent = ' '.repeat(level * 2);
      const before = _.isObject(node.valueBefore) ? `${indent}- ${node.key}: ${stringify(node.valueBefore, level + 1)}\n`
        : `${indent}  ${node.key}: ${node.valueAfter}\n`;
      const after = _.isObject(node.valueAfter) ? `${indent}+ ${node.key}: ${stringify(node.valueAfter, level + 1)}\n`
        : `${indent}  ${node.key}: ${node.valueAfter}\n`;
      return `${before}${after}`;
    },
    plain: node => `Property '${node.path}' was updated. From '${node.valueBefore}' to '${node.valueAfter}'`
  },
  {
    type: 'removed',
    content: (node, level) => {
      const indent = ' '.repeat(level * 2);
      return _.isObject(node.valueBefore) ? `${indent}- ${node.key}: ${stringify(node.valueBefore, level + 1)}\n`
      : `${indent}- ${node.key}: ${node.valueBefore}\n`},
    plain: node => `Property '${node.path}' was removed`,
  },
  {
    type: 'added',
    content: (node, level) => {
      const indent = ' '.repeat(level * 2);
      return _.isObject(node.valueAfter) ? `${indent}+ ${node.key}: ${stringify(node.valueAfter, level + 1)}\n`
      : `${indent}+  ${node.key}: ${node.valueAfter}\n`},
    plain: node => `Property '${node.path}' was added`
  }

]

const getActionNodeRender = node => actionNodeRender.find(({ type }) => node.type === type);

const renderAstThree = (astThree) => {
  const astAcc = '';
  const iter = (astNode, level) => {
    const indent = ' '.repeat(level * 2);
    astNode.reduce((acc, elem) => {
      const { content } = getActionNodeRender(elem);
      const str = elem.children ? `{\n${content(elem, level)}${iter(elem.children, level + 1)}\n${indent}}\n`
        : `${indent}${content(elem)}`;
      return acc.concat(str);
    },
    astAcc,
    );
    return `{\n${astAcc}}`;
  };
  return iter(astThree, 1)
};

export const getDiff = (pathBefore, pathAfter) => {
  const result = renderAstThree(buildAstThree(pathBefore, pathAfter));
  console.log(result);
  return result;
};

export default program
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .option('-V, --version', 'output the version number')
  .version(version)
  .action((firstConfig, secondConfig) => {
    console.log(getDiff(firstConfig, secondConfig));
  });
