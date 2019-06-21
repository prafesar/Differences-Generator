import _ from 'lodash';

const stringify = (elem, level) => {
  const indent = ' '.repeat(level * 2);
  const acc = [];
  Object.entries(elem).forEach(([key, value]) => {
    const content = _.isObject(value) ? _.flatten(stringify(value, level + 1))
      : value;
    acc.push(`${indent}  ${key}: ${content}`)
  });

  return `{\n${acc.join('\n')}${indent}\n}`;
};

const renderActions = [
  {
    type: 'unchanged',
    toStr: (obj, level) => {
      const { key, valueBefore } = obj;
      _.isObject(valueBefore) ? `  ${key}: ${stringify(valueBefore, level)}`
        : `  ${key}: ${valueBefore}`;
    }
  },
  {
    type: 'added',
    toStr: (obj, level) => {
      const { key, valueAfter } = obj;
      _.isObject(valueAfter) ? `+ ${key}: ${stringify(valueAfter, level)}`
        : `+ ${key}: ${valueAfter}`;
    }
  },
  {
    type: 'removed',
    toStr: (obj, level) => {
      const { key, valueBefore } = obj;
      _.isObject(valueBefore) ? `- ${key}: ${stringify(valueBefore, level)}`
        : `- ${key}: ${valueBefore}`;
    }
  },
  {
    type: 'updated',
    toStr: (obj, level) => {
      const { key, valueBefore, valueAfter } = obj;
      const before = _.isObject(valueBefore) ? `- ${key}: ${stringify(valueBefore, level)}`
        : `- ${key}: ${valueBefore}`;
      const after = _.isObject(valueAfter) ? `+ ${key}: ${stringify(valueAfter, level)}`
        : `+ ${key}: ${valueAfter}`;
      return [before, after];
    }
  }
];

const getRenderActions = (obj) => renderActions.find(({ type }) => type === obj.type);

const render = (ast) => {
  // we got array of node
  const f = (elem) => {
    const { path, children } = elem;
    const level = path.lenght;
    const { toStr } = getRenderActions(elem);
    return toStr(children ? render(children) : elem, level)
    }

  const res = ast.map(f).join('\n'); //----------

  return `{\n${res}\n}`
};