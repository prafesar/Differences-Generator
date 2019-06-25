
import { buildAstThree } from './ast';
import { renderDiffToJson, renderDiffToPlain } from './formatters';

export const getDiff = (pathBefore, pathAfter) => {
  const result = renderDiffToPlain(buildAstThree(pathBefore, pathAfter));
  return result;
};

