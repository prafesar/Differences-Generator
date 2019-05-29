#!/usr/bin/env node
import program from 'commander';
import { version } from '../../package.json';

program
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .option('-V, --version', 'output the version number')
  .version(version);

program.parse(process.argv);

console.log('app is running');
