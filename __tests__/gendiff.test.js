import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const baseFolder = '../__tests__/__fixtures__/';
const getPath = name => path.resolve(__dirname, baseFolder, name);

const testData = [
  ['tree', 'json'],
  ['tree', 'ini'],
  ['tree', 'yaml'],
  ['plain', 'json'],
  ['plain', 'ini'],
  ['plain', 'yaml'],
  ['json', 'json'],
  ['json', 'ini'],
  ['json', 'yaml'],
];

test.each(testData)(
  'test %#',
  (format, dataType) => {
    const filePathBefore = getPath(`before.${dataType}`);
    const filePathAfter = getPath(`after.${dataType}`);
    const filePathResult = getPath(`result-${format}`);

    const result = genDiff(filePathBefore, filePathAfter, format);
    const expected = fs.readFileSync(filePathResult, 'utf-8');
    expect(result).toEqual(expected);
  },
);
