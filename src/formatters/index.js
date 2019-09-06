import renderDiffToTree from './render-tree';
import renderDiffToPlain from './render-plain';

// render for src/index
export default (ast, format) => {
  const renderActions = {
    tree: arg => renderDiffToTree(arg),
    plain: arg => renderDiffToPlain(arg),
    json: arg => JSON.stringify(arg),
  };
  const render = renderActions[format || 'tree'];
  return render(ast);
};
