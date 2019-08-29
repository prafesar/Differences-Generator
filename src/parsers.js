import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parseActions = {
  '.json': JSON.parse,
  '.ini': ini.parse,
  '.yaml': yaml.load,
};

const getParseAction = filePath => parseActions[path.extname(filePath)];

const parseDataFromFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const parse = getParseAction(filePath);
  return parse(content);
};

export default parseDataFromFile;
