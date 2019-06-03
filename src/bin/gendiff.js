#!/usr/bin/env node
import commandLine, { getDiff } from '..';

commandLine.parse(process.argv);

const paths = process.argv.slice(2);
const beforeFilePath = paths[1];
const afterFilePath = paths[2];
console.log(beforeFilePath);
// const beforeFilePath = '../date/before.json';
// const afterFilePath = '../date/after.json';

getDiff(beforeFilePath, afterFilePath);
