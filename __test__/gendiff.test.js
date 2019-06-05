import fs from 'fs';
import { getDiff } from '../src';

test('generate diff', () => {
  const beforeFilePath = '/workspace/Differences-Generator/__test__/__fixtures__/before.json';
  const afterFilePath = '/workspace/Differences-Generator/__test__/__fixtures__/after.json';
  const resultFilePath = '/workspace/Differences-Generator/__test__/__fixtures__/result.txt';
  const result = fs.readFileSync(resultFilePath, 'utf-8');
  expect(getDiff(beforeFilePath, afterFilePath)).toBe(result);
});
