import fs from 'fs';
import path from 'path';
import parseData from './parsers';
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

  const parsedDataBefore = parseData(dataBefore.content, dataBefore.ext);
  const parsedDataAfter = parseData(dataAfter.content, dataAfter.ext);

  const ast = buildAst(parsedDataBefore, parsedDataAfter);
  return render(ast, format);
};

export default genDiff;
