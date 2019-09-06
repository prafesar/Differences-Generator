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

const renderDiffToPlain = (ast, pathAcc = []) => {
  const renderNodeAction = {
    removed: path => `Property '${pathToStr(path)}' was removed`,
    added: (path, { valueAfter }) => `Property '${pathToStr(path)}' was added whith value: ${stringify(valueAfter)}`,
    updated: (path, { valueBefore, valueAfter }) => `Property '${pathToStr(path)}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`,
    nested: (path, { children }) => renderDiffToPlain(children, path),
    unchanged: () => '',
  };

  const result = ast
    .reduce((acc, node) => {
      const { key, type } = node;
      const path = [...pathAcc, key];
      const render = renderNodeAction[type];
      return [...acc, render(path, node)];
    }, [])
    .filter(elem => elem !== '');

  return result.join('\n');
};

export default renderDiffToPlain;
