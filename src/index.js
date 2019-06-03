import program from 'commander';
import fs from 'fs';
import { version } from '../package.json';

export default program
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .option('-V, --version', 'output the version number')
  .version(version);

const getDateFromJSONfile = (filePath) => {
  const fileDate = fs.readFileSync(filePath);
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

  const result = allKeys.reduce((res, key) => {
    const beforeValue = beforeDate[key];
    const afterValue = afterDate[key];
    let newRes = [];
    if (beforeValue && afterValue) {
      newRes = beforeValue === afterValue ? [...res, `  ${key}: ${beforeValue}`]
        : [...res, `- ${key}: ${beforeValue}`, `+ ${key}: ${afterValue}`];
    } else if (beforeValue) {
      newRes = [...res, `- ${key}: ${beforeValue}`];
    } else if (afterValue) {
      newRes = [...res, `+ ${key}: ${afterValue}`];
    }
    return newRes;
  },
  []);
  printDiff(result);
};
