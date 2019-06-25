import { renderDiffToThree } from './render-three';
import { renderDiffToPlain } from './render-plain';

// render for src/index
export default (ast, format) => {
  const renderActions = {
    three: renderDiffToThree,
    // json: renderDiffToJson,
    plain: renderDiffToPlain
  };

  return renderActions[format](ast);
};
