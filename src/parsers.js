import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getType = filePath => path.extname(filePath);

export const getAbsolutePath = filePath => (path.isAbsolute(filePath) ? filePath
  : path.resolve(process.cwd(), filePath));

export const readFile = filePath => fs.readFileSync(getAbsolutePath(filePath), 'utf-8');

export default (filePath) => {
  let result;
  const fileContent = readFile(filePath);
  switch (getType(filePath)) {
    case '.json':
      result = JSON.parse(fileContent);
      break;
    case '.yaml':
      result = yaml.load(fileContent);
      break;
    case '.ini':
      result = ini.parse(fileContent);
      break;
    default:
      console.log("i don't know this extension");
  }
  return result;
};
