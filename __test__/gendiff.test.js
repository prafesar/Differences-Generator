import { getDiff } from '../src';

test('generate diff', () => {
  const beforeFilePath = '../date/before.json';
  const afterFilePath = '../date/after.json';
  expect(getDiff(beforeFilePath, afterFilePath)).toBe(2);
});
