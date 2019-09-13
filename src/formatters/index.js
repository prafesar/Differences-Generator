import renderDiffToTree from './render-tree';
import renderDiffToPlain from './render-plain';

const renderActions = {
  tree: renderDiffToTree,
  plain: renderDiffToPlain,
  json: JSON.stringify,
};

export default (ast, format) => renderActions[format || 'tree'](ast);
