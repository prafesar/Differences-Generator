#!/usr/bin/env node

import commandLine, { getDiff } from '..';

commandLine.parse(process.argv);

const paths = process.argv.slice(2);

const beforeFilePath = paths[1];
const afterFilePath = paths[2];
// gendiff before.json after.json
getDiff(beforeFilePath, afterFilePath);