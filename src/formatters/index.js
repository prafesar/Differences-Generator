import renderDiffToThree from './render-three';
import renderDiffToPlain from './render-plain';

// render for src/index
export default (ast, format) => {
  const renderActions = {
    three: arg => renderDiffToThree(arg),
    plain: arg => renderDiffToPlain(arg),
  };
  const render = renderActions[format || 'three'];
  return render(ast);
};
