import fs from 'fs';
import path from 'path';
import parseFile from './parsers';
import buildAst from './ast';
import render from './formatters';

const getData = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const ext = path.extname(filePath);
  return { content, ext };
};

const genDiff = (pathFileBefore, pathFileAfter, format) => {
  const dataBefore = getData(pathFileBefore);
  const dataAfter = getData(pathFileAfter);

  const parsedDataBefore = parseFile(dataBefore);
  const parsedDataAfter = parseFile(dataAfter);

  const ast = buildAst(parsedDataBefore, parsedDataAfter);
  return render(ast, format);
};

export default genDiff;
