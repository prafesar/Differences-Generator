
import { buildAstThree } from './ast';
import render from './formatters';

// getDiff
export default (pathBefore, pathAfter, format) => {
  const ast = buildAstThree(pathBefore, pathAfter);
  const result = render(ast, format);
  return result;
};
