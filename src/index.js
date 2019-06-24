
import { buildAstThree } from './ast';
import { renderAst } from './render';

export const getDiff = (pathBefore, pathAfter) => {
  const result = renderAst(buildAstThree(pathBefore, pathAfter));
  return result;
};

