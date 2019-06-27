import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const baseFolder = '../__test__/__fixtures__/';
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

const filePathList = fileList.map((unitList => unitList
  .map((str, index) => (index === 0 ? str : getPath(str)))));

test.each(filePathList)(
  'test %#',
  (format, fileBefore, fileAfter, expected) => {
    expect(genDiff(fileBefore, fileAfter, format)).toEqual(fs.readFileSync(expected, 'utf-8'));
  },
);
