const response = function name(msg, currentNode) {
  if (msg) {
    if (!currentNode.children[msg]) {
      let message = {message: ['invalid input']}
      return [message, currentNode ];
    }
    
    currentNode = currentNode.children[msg];
  }

  let message = currentNode.method()
  return [message, currentNode]
};

module.exports = {
  response,
};
