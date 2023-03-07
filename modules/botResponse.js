const response = function name(msg, currentNode, curOrder, orders) {
  if (msg) {
    if (!currentNode.children[msg]) {
      let message = {message: ['invalid input']}
      return [message, currentNode ];
    }
    
    currentNode = currentNode.children[msg];
  }

  let message = currentNode.method(curOrder, orders )
  return [message, currentNode]
};

module.exports = {
  response,
};
