import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parserActions = {
  '.json': JSON.parse,
  '.ini': ini.parse,
  '.yaml': yaml.load,
};

// getDate for ast.js
export default (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parse = parserActions[path.extname(filePath)];
  return parse(fileContent);
};
