#!/usr/bin/env node
import commandLine, { getDiff } from '..';

commandLine.parse(process.argv);

console.log(process.argv.slice(2));

// getDiff(beforeFilePath, afterFilePath);
