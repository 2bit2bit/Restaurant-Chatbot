const graph = require("./graph").responseGraph;

const response = function name(msg, currentNode = graph.root) {
 console.log(msg)
  if (!msg) {
    return graph.root.method();
  } else {
    currentNode = currentNode.children[msg];
  }

  if (!currentNode.children[msg]) {
    return { message: ["invalid input"] };
  }
  let respon =  currentNode.method();
  console.log(respon)
  return respon
};



module.exports = {
  response,
};
