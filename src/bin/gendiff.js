#!/usr/bin/env node
import commandLine, { getDiff } from '..';

commandLine.parse(process.argv);
// gendiff 'before.json' 'after.json'

const paths = process.argv.slice(2);

if (paths.length < 2) {
  console.log('you need help');
} else {
  const beforeFilePath = paths[0];
  const afterFilePath = paths[1];
  const result = getDiff(beforeFilePath, afterFilePath);
  console.log(result);
}
