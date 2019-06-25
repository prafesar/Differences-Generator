import _ from 'lodash';

const stringify = value => (_.isObject(value) ? '[complex value]' : value);
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

export const renderDiffToPlain = (ast, pathAcc = []) => {
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
