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

export const readFile = filePath => fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');

export const getDiff = (beforeFilelePath, afterFilePath) => {
  const beforeDate = JSON.parse(readFile(beforeFilelePath)); // obj
  const afterDate = JSON.parse(readFile(afterFilePath)); // obj

  const beforeKeys = Object.keys(beforeDate);
  const afterKeys = Object.keys(afterDate);
  const allKeys = new Set(beforeKeys.concat(afterKeys));

  let result = '{\n';
  allKeys.forEach((key) => {
    const beforeValue = beforeDate[key];
    const afterValue = afterDate[key];
    if (beforeValue) {
      if (afterValue) { // not changed
        if (beforeValue === afterValue) {
          result = `${result}    ${key}: ${beforeValue}\n`;
        } else { // changed
          result = `${result}  - ${key}: ${beforeValue}\n  + ${key}: ${afterValue}\n`;
        }
      } else { // delete
        result = `${result}  - ${key}: ${beforeValue}\n`;
      }
    } else if (afterValue) {
      result = `${result}  + ${key}: ${afterValue}\n`;
    }
  });

  return `${result}}`;
};
