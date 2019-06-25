import { renderDiffToJson } from './render-json';
import { renderDiffToPlain } from './render-plain';

export default (ast, format) => {
  if (format === 'plain') {
    return renderDiffToPlain(ast);
  }
  return renderDiffToJson(ast);
};
