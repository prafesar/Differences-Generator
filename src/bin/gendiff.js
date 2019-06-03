#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import commandLine, { getDiff } from '..';

commandLine.parse(process.argv);

// const paths = process.argv.slice(2);

// const beforeFilePath = paths[1];
// const afterFilePath = paths[2];

const beforeFilePath = fs.readFileSync(path.resolve(__dirname, "../date/before.json"));
const afterFilePath = fs.readFileSync(path.resolve(__dirname, "../date/after.json"));

// gendiff before.json after.json

getDiff(beforeFilePath, afterFilePath);
