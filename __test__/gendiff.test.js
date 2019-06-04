import { getDiff, readFile } from '../src';

test('generate diff', () => {
  const beforeFilePath = '../__test__/__fixtures__/before.json';
  const afterFilePath = '../__test__/__fixtures__/after.json';
  const resultFilePath = '../__test__/__fixtures__/result.txt';
  const result = readFile(resultFilePath);
  expect(getDiff(beforeFilePath, afterFilePath)).toBe(result);
});
