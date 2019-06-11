import program from 'commander';
import _ from 'lodash';
import parseFile from './parsers';
import { version } from '../package.json';

const addChildren = (obj) => {
  const result = [];
  const keys = Object.keys(obj);
  keys.filter(key => typeof obj[key] !== 'object')
    .forEach(key => result.push({ key, value: obj[key], type: ' ' }));
  keys.filter(key => typeof obj[key] === 'object')
    .forEach(key => result.push({
      key, value: '', type: ' ', children: addChildren(obj),
    }));
  return result;
};

const renderAst = (ast) => {
  const iter = (startAcc, astNode, spaceCount) => astNode.reduce((acc, elem) => {
    const beforeStr = `${' '.repeat(spaceCount)}${elem.type} ${elem.key}: `;

    const value = elem.children ? `${iter('{\n', elem.children, spaceCount + 2)}${' '.repeat(spaceCount)}}\n` : `${elem.value}\n`;
    return `${acc}${beforeStr}${value}`
  }, startAcc);
  const result = iter('{\n', ast, 2);
  return `${result}}`;
};

export const getDiff = (pathBefore, pathAfter) => {
  const readDateBefore = parseFile(pathBefore);
  const readDateAfter = parseFile(pathAfter);

  const iter = (acc, dateBefore, dateAfter) => {
    const keys = Array.from(
      new Set(Object.keys(dateBefore)
        .concat(Object.keys(dateAfter))),
    );

    const resultWhitoutObj = keys.filter(key => typeof dateBefore[key] !== 'object'
      && typeof dateAfter[key] !== 'object')
      .reduce((inAcc, key) => {
        const existBefore = Object.keys(dateBefore).includes(key);
        const existAfter = Object.keys(dateAfter).includes(key);
        const beforeValue = dateBefore[key];
        const afterValue = dateAfter[key];
        if (existBefore && !existAfter) {
          return [...inAcc, { key, value: beforeValue, type: '-' }];
        }
        if (!existBefore && existAfter) {
          return [...inAcc, { key, value: afterValue, type: '+' }];
        }
        if (existBefore && existAfter) {
          if (beforeValue === afterValue) {
            return [...inAcc, { key, value: afterValue, type: ' ' }];
          } else {
            return [...inAcc, { key, value: beforeValue, type: '-' }, { key, value: afterValue, type: '+' }];
          }
        }
      }, acc);

    const resWhitObj = keys.filter(key => typeof dateBefore[key] === 'object'
      || typeof dateAfter[key] === 'object')
      .reduce((oAcc, key) => {
        const existBefore = Object.keys(dateBefore).includes(key);
        const existAfter = Object.keys(dateAfter).includes(key);
        const beforeIsObject = typeof dateBefore[key] === 'object';
        const afterIsObject = typeof dateAfter[key] === 'object';
        const beforeValue = dateBefore[key];
        const afterValue = dateAfter[key];

        if (beforeIsObject && afterIsObject) {
          if (Object.is(beforeValue, afterValue)) {
            return [...oAcc, { key, value: '', type: ' ', children: addChildren(afterValue) }];
          } else {
            return [...oAcc, { key, value: '', type: ' ', children: iter([], beforeValue, afterValue) }];
          }
        }

        if (beforeIsObject && !existAfter) {
          return [...oAcc, { key, value: '', type: '-', children: addChildren(beforeValue) }];
        } else if (beforeIsObject && existAfter) {
          return [...oAcc, { key, value: '', type: '-', children: addChildren(beforeValue) },
            { key, value: afterValue, type: '+' }];
        }

        if (!existBefore && afterIsObject) {
          return [...oAcc, { key, value: '', type: '+', children: addChildren(afterValue) }];
        } else if (existBefore && afterIsObject) {
          return [...oAcc, { key, value: beforeValue, type: '-' },
            { key, value: '', type: '+', children: addChildren(afterValue) }];
        }
      }, resultWhitoutObj);
    return resWhitObj;
  };
  const ast = iter([], readDateBefore, readDateAfter);
  return renderAst(ast);
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
