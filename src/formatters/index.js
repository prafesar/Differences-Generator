import renderDiffToThree from './render-three';
import renderDiffToPlain from './render-plain';
import renderDiffToJson from './render-json';

// render for src/index
export default (ast, format) => {
  const renderActions = {
    three: arg => renderDiffToThree(arg),
    plain: arg => renderDiffToPlain(arg),
    json: arg => renderDiffToJson(arg),
  };
  const render = renderActions[format || 'three'];
  return render(ast);
};
