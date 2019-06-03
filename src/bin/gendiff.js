#!/usr/bin/env node
import commandLine, { getDiff } from '..';

commandLine.parse(process.argv);

const paths = process.argv.slice(2);

const beforeFilePath = paths[1];
const afterFilePath = paths[2];
// const beforePath = '../date/before.json';
// const afterPath = '../date/after.json';

// gendiff date/before.json date/after.json

getDiff(beforeFilePath, afterFilePath);
