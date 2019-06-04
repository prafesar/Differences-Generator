import program from 'commander';
import fs from 'fs';
import path from 'path';
import { version } from '../package.json';

export default program
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .option('-V, --version', 'output the version number')
  .version(version);

const getDateFromJSONfile = (filePath) => {
  const fileDate = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
  return JSON.parse(fileDate);
};

export const getDiff = (beforeFilelePath, afterFilePath) => {
  const beforeDate = getDateFromJSONfile(beforeFilelePath); // obj
  const afterDate = getDateFromJSONfile(afterFilePath); // obj

  const beforeKeys = Object.keys(beforeDate);
  const afterKeys = Object.keys(afterDate);
  const allKeys = new Set(beforeKeys.concat(afterKeys));
  const result = '{\n';
  allKeys.forEach((key) => {
    const beforeValue = beforeDate[key];
    const afterValue = afterDate[key];
    if (beforeValue) {
      if (afterValue) { // not changed
        if (beforeValue === afterValue) {
          return `${result}    ${key}: ${beforeValue}\n`;
        } else { // changed
          return `${result}  - ${key}: ${beforeValue}\n  + ${key}: ${afterValue}\n`;
        }
      } else { // delete
        return `${result}  - ${key}: ${beforeValue}\n`;
      }
    } else {
      if (afterValue) {
        return `${result}  + ${key}: ${afterValue}\n`;
      }
    }
  });
  result = `${result}}\n`;
  console.log(result);
  return result;
};
