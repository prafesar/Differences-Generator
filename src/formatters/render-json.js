
const renderList = list => list.reduce((acc, node) => [...acc,
  Object.entries(node)
    .reduce((nodeAcc, [key, value]) => ({
      ...nodeAcc, [key]: Array.isArray(value) ? renderList(value) : value,
    }), {}),
], []);

// renderAstToJson
export default ast => JSON.stringify(renderList(ast));
