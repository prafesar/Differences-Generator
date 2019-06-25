import _ from 'lodash';
import getDate from './parsers';

const getDiff = (dateBefore, dateAfter) => {
  const keys = _.union(_.keys(dateBefore), _.keys(dateAfter));

  const nodeMethods = [
    {
      check: key => !_.has(dateAfter, key),
      node: key => ({
        key,
        type: 'removed',
        valueBefore: dateBefore[key],
      }),
    },
    {
      check: key => !_.has(dateBefore, key),
      node: key => ({
        key,
        type: 'added',
        valueAfter: dateAfter[key],
      }),
    },
    {
      check: key => _.isObject(dateBefore[key]) && _.isObject(dateAfter[key]),
      node: key => ({
        key,
        type: 'nested',
        children: getDiff(dateBefore[key], dateAfter[key]),
      }),
    },
    {
      check: key => dateBefore[key] !== dateAfter[key],
      node: key => ({
        key,
        type: 'updated',
        valueBefore: dateBefore[key],
        valueAfter: dateAfter[key],
      }),
    },
    {
      check: key => dateBefore[key] === dateAfter[key],
      node: key => ({
        key,
        type: 'unchanged',
        valueAfter: dateBefore[key],
      }),
    },
  ];

  const getNodeMethod = key => nodeMethods.find(({ check }) => check(key));

  return keys.reduce((acc, key) => {
    const { node } = getNodeMethod(key);
    return [...acc, node(key)];
  }, []);
};

export const buildAstThree = (pathFileBefore, pathFileAfter) => {
  const dateBefore = getDate(pathFileBefore);
  const dateAfter = getDate(pathFileAfter);
  return getDiff(dateBefore, dateAfter);
};

export default getDiff;
