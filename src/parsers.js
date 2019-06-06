import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getType = filePath => path.extname(filePath);

export const getAbsolutePath = filePath => (path.isAbsolute(filePath) ? filePath
  : path.resolve(process.cwd(), filePath));

export const readFile = filePath => fs.readFileSync(getAbsolutePath(filePath), 'utf-8');

export default (filePath) => {
  let result;
  if (getType(filePath) === '.json') {
    result = JSON.parse(readFile(filePath));
  }
  if (getType(filePath) === '.yaml') {
    result = yaml.load(readFile(filePath));
  }
  return result;
};
