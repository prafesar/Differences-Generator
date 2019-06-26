#!/usr/bin/env node
import program from 'commander';
import path from 'path';
import { version } from '../../package.json';
import genDiff from '..';

const getCurrentPath = filePath => (path.isAbsolute(filePath) ? filePath
  : path.resolve(process.cwd(), filePath));

program
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .option('-V, --version', 'output the version number')
  .version(version)
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(getCurrentPath(firstConfig), getCurrentPath(secondConfig), program.format));
  })
  .parse(process.argv);
