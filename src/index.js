import parseFile from './parsers';
import buildAst from './ast';
import render from './formatters';

const genDiff = (pathFileBefore, pathFileAfter, format) => {
  const dateBefore = parseFile(pathFileBefore);
  const dateAfter = parseFile(pathFileAfter);
  const ast = buildAst(dateBefore, dateAfter);
  return render(ast, format);
};

export default genDiff;
