const graph = require("./graph").responseGraph;

const response = function name(msg, currentNode = graph.root) {
  if (!msg) {
    return graph.root.method();
  } else {
    if (!currentNode.children[msg]) {
      return { message: ["invalid input"] };
    }
    currentNode = currentNode.children[msg];
  }
  
  return currentNode.method();
};

module.exports = {
  response,
};
