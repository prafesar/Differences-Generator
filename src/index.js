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

const printDiff = (arrayDiff) => {
  console.log('{');
  arrayDiff.forEach(elem => console.log(`  ${elem}`));
  console.log('}');
};

export const getDiff = (beforeFilelePath, afterFilePath) => {
  const beforeDate = getDateFromJSONfile(beforeFilelePath); // obj
  const afterDate = getDateFromJSONfile(afterFilePath); // obj

  const beforeKeys = Object.keys(beforeDate);
  const afterKeys = Object.keys(afterDate);
  const allKeys = new Set(beforeKeys.concat(afterKeys));
  const result = [];
  allKeys.forEach((key) => {
    const beforeValue = beforeDate[key];
    const afterValue = afterDate[key];
    if (beforeValue) {
      if (afterValue) { // not changed
        if (beforeValue === afterValue) {
          result.push(`  ${key}: ${beforeValue}`);
        } else { // changed
          result.push(`- ${key}: ${beforeValue}`);
          result.push(`+ ${key}: ${afterValue}`);
        }
      } else { // delete
        result.push(`- ${key}: ${beforeValue}`);
      }
    } else {
      if (afterValue) {
        result.push(`+ ${key}: ${afterValue}`)
      }
    }
  });
  printDiff(result);
};
