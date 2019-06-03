import program from 'commander';
import { version } from '../package.json';

export default program
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .option('-V, --version', 'output the version number')
  .version(version);

const getDateFromJSONfile = (filePath) => JSON.parse(fs.readFileSync(filePath));

const getDiff = (beforeFilelePath, afterFilePath) => {
    const beforeDate = getDateFromJSONfile(beforeFilelePath); // obj
    const afterDate = getDateFromJSONfile(afterFilePath); // obj

    const beforeKeys = Object.keys(beforeDate);
    const afterKeys = Object.keys(afterDate);
    const allKeys = new Set(beforeKeys.concat(afterKeys));

    const result = allKeys.reduce((res, key) => {
        const beforeValue = beforeDate[key];
        const afterValue = afterDate[key];
        if (beforeValue && afterValue) {
            return beforeValue === afterValue ? [...res, `  ${key}: ${beforeValue}`]
                : [...res, `- ${key}: ${beforeValue}`, `+ ${key}: ${afterValue}`];
        } else if (beforeValue) {
            return [...res, `- ${key}: ${beforeValue}`];
        } else if (afterValue) {
            return [...res, `+ ${key}: ${afterValue}`];
        }
    },
    []);
}

const printDiff = (arrayDiff) => {
    console.log('{');
    arrayDiff.forEach(elem => console.log(`  ${elem}`))
}