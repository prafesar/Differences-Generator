#!/usr/bin/env node
import program from 'commander';
import { version } from '../../package.json';

program
  .version(version)
  .option('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format');

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference');

program.parse(process.argv);

program.help();

console.log('hi');