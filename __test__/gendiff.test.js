import fs from 'fs';
import path from 'path';
import { getDiff } from '../src';

const testsPath = fileName => `../__test__/__fixtures__/${fileName}`;
const result = fs.readFileSync(path.resolve(__dirname, '__fixtures__/result.txt'), 'utf-8');

test('generate diff from flat JSON', () => {
  expect(getDiff(testsPath('before.json'), testsPath('after.json'))).toBe(result);
});

test('generate diff from flat YAML', () => {
  expect(getDiff(testsPath('before.yaml'), testsPath('after.yaml'))).toBe(result);
});

test('generate diff from flat INI', () => {
  expect(getDiff(testsPath('before.ini'), testsPath('after.ini'))).toBe(result);
});
/*
const before = [
  testsPath('before.json'),
  testsPath('before.yaml'),
  testsPath('before.ini')
];

const after = [
  testsPath('after.json'),
  testsPath('after.yaml'),
  testsPath('after.ini')
];

const expected = [result, result, result];

test.each([before, after, expected])(
  '%s',
  (before, after, expected) => {
    expect(getDiff(before, after)).toBe(expected);
  },
);
*/
