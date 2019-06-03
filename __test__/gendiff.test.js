import getDiff from '../src';

test('Generate diffrence', () => {
  const beforeFilePath = '../date/before.json';
  const afterFilePath = '../date/after.json';
  expect(getDiff(beforeFilePath, afterFilePath)).toBe(2)
})