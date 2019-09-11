import renderDiffToTree from './render-tree';
import renderDiffToPlain from './render-plain';

// render for src/index
export default (ast, format) => {
  const renderActions = {
    tree: renderDiffToTree,
    plain: renderDiffToPlain,
    json: JSON.stringify,
  };
  const render = renderActions[format || 'tree'];
  return render(ast);
};
