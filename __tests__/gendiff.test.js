import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const baseFolder = '../__tests__/__fixtures__/';
const getPath = name => path.resolve(__dirname, baseFolder, name);

const fileList = [
  ['three', 'before.json', 'after.json', 'result-three'],
  ['three', 'before.ini', 'after.ini', 'result-three'],
  ['three', 'before.yaml', 'after.yaml', 'result-three'],
  ['plain', 'before.json', 'after.json', 'result-plain'],
  ['plain', 'before.ini', 'after.ini', 'result-plain'],
  ['plain', 'before.yaml', 'after.yaml', 'result-plain'],
  ['json', 'before.json', 'after.json', 'result-json'],
  ['json', 'before.ini', 'after.ini', 'result-json'],
  ['json', 'before.yaml', 'after.yaml', 'result-json'],
];

test.each(fileList)(
  'test %#',
  (format, fileNameBefore, fileNameAfter, fileNameResult) => {
    const filePathBefore = getPath(fileNameBefore);
    const filePathAfter = getPath(fileNameAfter);
    const filePathResult = getPath(fileNameResult);

    const result = genDiff(filePathBefore, filePathAfter, format);
    const expected = fs.readFileSync(filePathResult, 'utf-8');
    expect(result).toEqual(expected);
  },
);
