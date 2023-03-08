const response = function name(msg, sessionData) {
  let nextNode;
  if (!msg) {
    nextNode = sessionData.currentNode;
  } else {
    if (!sessionData.currentNode.children[msg]) {
      return ["invalid input"];
    }
    nextNode = sessionData.currentNode.children[msg];
    sessionData.currentNode = nextNode
  }
  return nextNode.method(sessionData);
};

module.exports = {
  response,
};
