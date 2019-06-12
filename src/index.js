import program from 'commander';
import parseFile from './parsers';
import { version } from '../package.json';

const addChildren = (obj) => {
  const result = [];
  const keys = Object.keys(obj);
  keys.filter(key => typeof obj[key] !== 'object')
    .forEach(key => result.push({ key, value: obj[key], type: ' ' }));
  keys.filter(key => typeof obj[key] === 'object')
    .forEach(key => result.push({
      key, value: '', type: ' ', children: addChildren(obj),
    }));
  return result;
};

const renderAst = (ast) => {
  const iter = (astNode, spaceCount = 2, acc = []) => {
    astNode.forEach((elem) => {
      const beforeStr = `${' '.repeat(spaceCount)}${elem.type} ${elem.key}: `;
      const value = elem.children ? `{\n${iter(elem.children, spaceCount + 2)}${' '.repeat(spaceCount + 2)}}`
        : elem.value;
      acc.push(`${beforeStr}${value}\n`);
    });
    return acc.join('');
  };
  const result = `{\n${iter(ast)}}`;
  return result;
};

export const getDiff = (pathBefore, pathAfter) => {
  const readDateBefore = parseFile(pathBefore);
  const readDateAfter = parseFile(pathAfter);

  const iter = (acc, dateBefore, dateAfter) => {
    const keys = Array.from(
      new Set(Object.keys(dateBefore)
        .concat(Object.keys(dateAfter))),
    );
    const resultWhitoutObj = keys.filter(key => typeof dateBefore[key] !== 'object'
      && typeof dateAfter[key] !== 'object')
      .reduce((inAcc, key) => {
        const existBefore = Object.keys(dateBefore).includes(key);
        const existAfter = Object.keys(dateAfter).includes(key);
        const beforeValue = dateBefore[key];
        const afterValue = dateAfter[key];
        let result;
        if (existBefore && !existAfter) {
          result = [...inAcc, { key, value: beforeValue, type: '-' }];
        }
        if (!existBefore && existAfter) {
          result = [...inAcc, { key, value: afterValue, type: '+' }];
        }
        if (existBefore && existAfter) {
          if (beforeValue === afterValue) {
            result = [...inAcc, { key, value: afterValue, type: ' ' }];
          } else {
            result = [...inAcc, { key, value: beforeValue, type: '-' }, { key, value: afterValue, type: '+' }];
          }
        }
        return result;
      }, acc);

    const resWhitObj = keys.filter(key => typeof dateBefore[key] === 'object'
      || typeof dateAfter[key] === 'object')
      .reduce((oAcc, key) => {
        const existBefore = Object.keys(dateBefore).includes(key);
        const existAfter = Object.keys(dateAfter).includes(key);
        const beforeIsObject = typeof dateBefore[key] === 'object';
        const afterIsObject = typeof dateAfter[key] === 'object';
        const beforeValue = dateBefore[key];
        const afterValue = dateAfter[key];
        if (beforeIsObject && afterIsObject) {
          if (Object.is(beforeValue, afterValue)) {
            return [...oAcc, {
              key, value: '', type: ' ', children: addChildren(afterValue),
            }];
          }
          return [...oAcc, {
            key, value: '', type: ' ', children: iter([], beforeValue, afterValue),
          }];
        }
        if (beforeIsObject) {
          if (!existAfter) {
            return [...oAcc, {
              key, value: '', type: '-', children: addChildren(beforeValue),
            }];
          }
          return [...oAcc, {
            key, value: '', type: '-', children: addChildren(beforeValue),
          },
          {
            key, value: afterValue, type: '+',
          }];
        }
        if (!existBefore && afterIsObject) {
          return [...oAcc, {
            key, value: '', type: '+', children: addChildren(afterValue),
          }];
        }
        return [...oAcc, {
          key, value: beforeValue, type: '-',
        },
        {
          key, value: '', type: '+', children: addChildren(afterValue),
        }];
      }, resultWhitoutObj);
    return resWhitObj;
  };
  const ast = iter([], readDateBefore, readDateAfter);
  return renderAst(ast);
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
