import getDiff from '../src';

test('Generate diffrence', () => {
  const beforeFilePath = '../src/date/before.json';
  const afterFilePath = '../src/date/after.json';
  expect(getDiff(beforeFilePath, afterFilePath)).toBe(2)
})