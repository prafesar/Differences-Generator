import _ from 'lodash';

const stringify = (value) => {
  const valueTypes = {
    number: _.identity,
    boolean: _.identity,
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
  nested: (path, { children }, f) => f(children, path),
  unchanged: () => null,
};

function renderDiffToPlain(ast, pathAcc = []) {
  return ast
    .map((node) => {
      const { key, type } = node;
      const path = [...pathAcc, key];
      const render = renderNodeAction[type];
      return render(path, node, renderDiffToPlain);
    })
    .filter(elem => elem !== null)
    .join('\n');
}

export default renderDiffToPlain;
