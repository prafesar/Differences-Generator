import program from 'commander';
import parseFile from './parsers';
import { version } from '../package.json';

export const getDiff = (beforeFilelePath, afterFilePath) => {
  const beforeDate = parseFile(beforeFilelePath); // obj
  const afterDate = parseFile(afterFilePath); // obj

  const beforeKeys = Object.keys(beforeDate);
  const afterKeys = Object.keys(afterDate);
  const allKeys = new Set(beforeKeys.concat(afterKeys));
  let result = '{\n';

  allKeys.forEach((key) => {
    const beforeValue = beforeDate[key];
    const afterValue = afterDate[key];
    const existBefore = beforeKeys.includes(key);
    const existAfter = afterKeys.includes(key);
    if (existBefore && existAfter) {
      if (beforeValue === afterValue) {
        result = `${result}    ${key}: ${beforeValue}\n`;
      } else {
        result = `${result}  - ${key}: ${beforeValue}\n  + ${key}: ${afterValue}\n`;
      }
    }
    if (!existBefore && existAfter) {
      result = `${result}  + ${key}: ${afterValue}\n`;
    }
    if (existBefore && !existAfter) {
      result = `${result}  - ${key}: ${beforeValue}\n`;
    }
  });

  return `${result}}`;
};

export default program
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .option('-V, --version', 'output the version number')
  .version(version)
  .action((firstConfig, secondConfig) => {
    console.log(getDiff(firstConfig, secondConfig));
  });
