import fs from 'fs';
import path from 'path';
import getDiff from '../src';

// path from 'src/index.js' to tests fixtures
const testsPath = fileName => `../__test__/__fixtures__/${fileName}`;
// result, read using path from '__test__/gendiff.test.js'
const result = fs.readFileSync(path.resolve(__dirname, '__fixtures__/result-plain.txt'), 'utf-8');

test('generate diff from JSON', () => {
  expect(getDiff(testsPath('before.json'), testsPath('after.json'), 'plain')).toBe(result);
});

test('generate diff from YAML', () => {
  expect(getDiff(testsPath('before.yaml'), testsPath('after.yaml'), 'plain')).toBe(result);
});

test('generate diff from INI', () => {
  expect(getDiff(testsPath('before.ini'), testsPath('after.ini'), 'plain')).toBe(result);
});
