import fs from 'fs';
import path from 'path';
import { getDiff } from '../src';
import { getAbsolutePath } from '../src/parsers';

const testsPath = fileName => path.resolve('/workspace/Differences-Generator/__test__/__fixtures__/', fileName);

test('get absolute path from relative', () => {
  expect(getAbsolutePath('__test__/__fixtures__/before.json'))
    .toBe(testsPath('before.json'));
});

test('generate diff from JSON using absolute path', () => {
  const result = fs.readFileSync(testsPath('result-json.txt'), 'utf-8');
  expect(getDiff(testsPath('before.json'), testsPath('after.json'))).toBe(result);
});

test('generate diff from YAML using absolute path', () => {
  const result = fs.readFileSync(testsPath('result-yaml.txt'), 'utf-8');
  expect(getDiff(testsPath('before.yaml'), testsPath('after.yaml'))).toBe(result);
});
