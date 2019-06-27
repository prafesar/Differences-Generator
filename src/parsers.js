import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parserActions = {
  '.json': JSON.parse,
  '.ini': ini.parse,
  '.yaml': yaml.load,
};

const convertContent = (content) => {
  const convertValueActions = [
    { // true -> 1
      check: v => (typeof Number(v) === 'number') && (String(Number(v)) === String(v)),
      action: v => Number(v),
    },
    { // 1 -> true
      check: v => (typeof Boolean(v) === 'boolean') && (String(Boolean(v)) === String(v)),
      action: v => Boolean(v),
    },
    { // object
      check: v => _.isObject(v),
      action: v => convertContent(v),
    },
    { // string
      check: v => v === String(v),
      action: v => v,
    },
  ];

  const convertValue = (value) => {
    const { action } = convertValueActions.find(({ check }) => check(value));
    return action(value);
  };

  return Object.entries(content)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: convertValue(value) }), {});
};

// getDate for ast.js
export default (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parse = parserActions[path.extname(filePath)];
  const parsedContent = parse(fileContent);
  return convertContent(parsedContent);
};
