#!/usr/bin/env node
import program from 'commander';
import path from 'path';
import { version } from '../../package.json';
import genDiff from '..';

const getPath = filePath => path.resolve(process.cwd(), filePath);

program
  .description('Compares two configuration files and shows a difference')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .option('-V, --version', 'output the version number')
  .version(version)
  .action((firstConfig, secondConfig) => {
    const pathFileBefore = getPath(firstConfig);
    const pathFileAfter = getPath(secondConfig);
    console.log(
      genDiff(pathFileBefore, pathFileAfter, program.format),
    );
  })
  .parse(process.argv);
