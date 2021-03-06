import _ from 'lodash';

const buildAst = (dateBefore, dateAfter) => {
  const keys = _.union(_.keys(dateBefore), _.keys(dateAfter));

  const nodeMethods = [
    {
      check: key => !_.has(dateAfter, key),
      node: key => ({
        key, type: 'removed', valueBefore: dateBefore[key],
      }),
    },
    {
      check: key => !_.has(dateBefore, key),
      node: key => ({
        key, type: 'added', valueAfter: dateAfter[key],
      }),
    },
    {
      check: key => _.isObject(dateBefore[key]) && _.isObject(dateAfter[key]),
      node: key => ({
        key, type: 'nested', children: buildAst(dateBefore[key], dateAfter[key]),
      }),
    },
    {
      check: key => dateBefore[key] !== dateAfter[key],
      node: key => ({
        key, type: 'updated', valueBefore: dateBefore[key], valueAfter: dateAfter[key],
      }),
    },
    {
      check: key => dateBefore[key] === dateAfter[key],
      node: key => ({
        key, type: 'unchanged', valueAfter: dateBefore[key],
      }),
    },
  ];

  const getNodeMethod = key => nodeMethods.find(({ check }) => check(key));

  return keys.map((key) => {
    const { node } = getNodeMethod(key);
    return node(key);
  });
};

export default buildAst;
