import _ from 'lodash';

const tabSize = 4;
const indent = level => ' '.repeat(level * tabSize);
let nodeRenderAction = [];

function renderDiffToThree(ast, level = 0) {
  const result = ast.reduce((acc, node) => {
    const { action } = nodeRenderAction.find(({ type }) => node.type === type);
    return [...acc, action(node, level)];
  }, []);

  return `{\n${result.join('\n')}\n${indent(level)}}`;
}

const stringify = (inValue, level) => {
  if (!_.isObject(inValue)) {
    return inValue;
  }
  const indentLevel = indent(level + 1);
  const indentBrackets = indent(level);
  const entries = Object.entries(inValue);
  const result = entries.map(([key, value]) => `${indentLevel}${key}: ${stringify(value, level + 1)}`);
  return `{\n${result.join('\n')}\n${indentBrackets}}`;
};

function renderLeafNode(levl, mark, key, value) {
  return `${indent(levl)}  ${mark} ${key}: ${stringify(value, levl + 1)}`;
}

function renderThreeNode(levl, key, children) {
  return `${indent(levl)}    ${key}: ${renderDiffToThree(children, levl + 1)}`;
}

nodeRenderAction = [
  {
    type: 'removed',
    action: ({ key, valueBefore }, nodeLevel) => renderLeafNode(nodeLevel, '-', key, valueBefore),
  },
  {
    type: 'added',
    action: ({ key, valueAfter }, nodeLevel) => renderLeafNode(nodeLevel, '+', key, valueAfter),
  },
  {
    type: 'nested',
    action: ({ key, children }, nodeLevel) => renderThreeNode(nodeLevel, key, children),
  },
  {
    type: 'updated',
    action: ({ key, valueBefore, valueAfter }, nodeLevel) => {
      const before = renderLeafNode(nodeLevel, '-', key, valueBefore);
      const after = renderLeafNode(nodeLevel, '+', key, valueAfter);
      return `${before}\n${after}`;
    },
  },
  {
    type: 'unchanged',
    action: ({ key, valueAfter }, nodeLevel) => renderLeafNode(nodeLevel, ' ', key, valueAfter),
  },
];

export default renderDiffToThree;
