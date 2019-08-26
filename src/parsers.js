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

const normalizeDate = (content) => {
  const normalizeValueActions = [
    { // from string "234" to number 234
      check: v => (typeof Number(v) === 'number') && (String(Number(v)) === String(v)),
      action: v => Number(v),
    },
    { // from string "true" to boolean true
      check: v => (typeof Boolean(v) === 'boolean') && (String(Boolean(v)) === String(v)),
      action: v => Boolean(v),
    },
    { // if value is object
      check: v => _.isObject(v),
      action: v => normalizeDate(v),
    },
    { // if value is string
      check: v => v === String(v),
      action: v => v,
    },
  ];

  const normalizeValue = (value) => {
    const { action } = normalizeValueActions.find(({ check }) => check(value));
    return action(value);
  };

  return Object.entries(content)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: normalizeValue(value) }), {});
};

// get date from file
export default (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parse = parserActions[path.extname(filePath)];
  const parsedContent = parse(fileContent);
  return normalizeDate(parsedContent);
};
