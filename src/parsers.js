import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getAbsolutePath = filePath => (path.isAbsolute(filePath) ? filePath
  : path.resolve(__dirname, filePath));

export const readFile = filePath => fs.readFileSync(getAbsolutePath(filePath), 'utf-8');

const parserActions = [
  {
    ext: '.json',
    parse: src => JSON.parse(src),
  },
  {
    ext: '.ini',
    parse: src => ini.parse(src),
  },
  {
    ext: '.yaml',
    parse: src => yaml.load(src),
  },
];

const getParserAction = filePath => parserActions.find(({ ext }) => path.extname(filePath) === ext);

export default (filePath) => {
  const { parse } = getParserAction(filePath);
  const fileContent = readFile(filePath);
  return parse(fileContent);
};
