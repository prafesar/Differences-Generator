import fs from 'fs';
import path from 'path';
import { getDiff } from '../src';
import { getAbsolutePath } from '../src/parsers';

const testsPath = fileName => path.resolve('/workspace/Differences-Generator/__test__/__fixtures__/', fileName);
const result = fs.readFileSync(testsPath('result.txt'), 'utf-8');

test('get absolute path from relative', () => {
  expect(getAbsolutePath('__test__/__fixtures__/before.json'))
    .toBe(testsPath('before.json'));
});

test('generate diff from JSON', () => {
  expect(getDiff(testsPath('before.json'), testsPath('after.json'))).toBe(result);
});

test('generate diff from YAML', () => {
  expect(getDiff(testsPath('before.yaml'), testsPath('after.yaml'))).toBe(result);
});

test('generate diff from INI', () => {
  expect(getDiff(testsPath('before.ini'), testsPath('after.ini'))).toBe(result);
});
