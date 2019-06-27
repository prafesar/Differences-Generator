import _ from 'lodash';

const stringify = (value) => {
  const valueTypes = {
    number: v => v,
    boolean: v => v,
    string: v => `'${v}'`,
    object: () => '[complex value]',
  };
  return valueTypes[typeof value](value);
};

const pathToStr = path => path.join('.');

const renderNodeAction = [
  {
    type: 'removed',
    render: path => `Property '${pathToStr(path)}' was removed`,
  },
  {
    type: 'added',
    render: (path, { valueAfter }) => `Property '${pathToStr(path)}' was added whith value: ${stringify(valueAfter)}`,
  },
  {
    type: 'updated',
    render: (path, { valueBefore, valueAfter }) => `Property '${pathToStr(path)}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`,
  },
];

const getRenderNodeAction = node => renderNodeAction.find(({ type }) => node.type === type);

const renderDiffToPlain = (ast, pathAcc = []) => {
  const result = ast
    .filter(({ type }) => type !== 'unchanged')
    .reduce((acc, node) => {
      const { key, children } = node;
      const path = [...pathAcc, key];
      if (children) {
        return _.flatten([...acc, renderDiffToPlain(children, path)]);
      }
      const { render } = getRenderNodeAction(node);
      return [...acc, render(path, node)];
    }, []);
  return result.join('\n');
};

export default renderDiffToPlain;
