import _ from 'lodash';

const tabSize = 4;
const indent = level => ' '.repeat(level * tabSize);

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

export const renderDiffToJson = (ast, level = 0) => {
  const renderNodeAction = [
    {
      type: 'removed',
      render: ({ key, valueBefore }, nodeLevel) => `${indent(nodeLevel)}  - ${key}: ${stringify(valueBefore, nodeLevel + 1)}`,
    },
    {
      type: 'added',
      render: ({ key, valueAfter }, nodeLevel) => `${indent(nodeLevel)}  + ${key}: ${stringify(valueAfter, nodeLevel + 1)}`,
    },
    {
      type: 'nested',
      render: ({ key, children }, nodeLevel) => `${indent(nodeLevel)}    ${key}: ${renderDiffToJson(children, nodeLevel + 1)}`,
    },
    {
      type: 'updated',
      render: ({ key, valueBefore, valueAfter }, nodeLevel) => `${indent(nodeLevel)}  - ${key}: ${stringify(valueBefore, nodeLevel + 1)}\n${indent(nodeLevel)}  + ${key}: ${stringify(valueAfter, nodeLevel + 1)}`,
    },
    {
      type: 'unchanged',
      render: ({ key, valueAfter }, nodeLevel) => `${indent(nodeLevel)}    ${key}: ${stringify(valueAfter, nodeLevel + 1)}`,
    },
  ];

  const getRenderNodeAction = node => renderNodeAction.find(({ type }) => node.type === type);

  const result = ast.reduce((acc, node) => { // reduce
    const { render } = getRenderNodeAction(node);
    return [...acc, render(node, level)];
  }, []);
  return `{\n${result.join('\n')}\n${indent(level)}}`;
};
