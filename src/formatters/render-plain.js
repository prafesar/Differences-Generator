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

const renderNodeAction = {
  removed: path => `Property '${pathToStr(path)}' was removed`,
  added: (path, { valueAfter }) => `Property '${pathToStr(path)}' was added whith value: ${stringify(valueAfter)}`,
  updated: (path, { valueBefore, valueAfter }) => `Property '${pathToStr(path)}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`,
};

const renderDiffToPlain = (ast, pathAcc = []) => {
  const result = ast
    .filter(({ type }) => type !== 'unchanged')
    .reduce((acc, node) => {
      const { key, type, children } = node;
      const path = [...pathAcc, key];
      if (type === 'nested') {
        return _.flatten([...acc, renderDiffToPlain(children, path)]);
      }
      const render = renderNodeAction[type];
      return [...acc, render(path, node)];
    }, []);
  return result.join('\n');
};

export default renderDiffToPlain;
