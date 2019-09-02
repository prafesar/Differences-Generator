import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parseActions = {
  '.json': JSON.parse,
  '.ini': ini.parse,
  '.yaml': yaml.load,
};

const getData = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const ext = path.extname(filePath);
  return { content, ext };
};

const parseData = (content, ext) => parseActions[ext](content);

export default (filePath) => {
  const { content, ext } = getData(filePath);
  return parseData(content, ext);
};
