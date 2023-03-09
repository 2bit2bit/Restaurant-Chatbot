const response = (msg, sessionData) => {
  let nextNode;
  if (!msg) {
    nextNode = sessionData.currentNode;
  } else {
    
    if (sessionData.currentNode.index == "greeting") {
      nextNode = sessionData.currentNode
      return nextNode.method(sessionData, msg);
    } else {
      if (!sessionData.currentNode.children[msg]) {
        return ["invalid input", 'sdsdsd'];
      }
      nextNode = sessionData.currentNode.children[msg];
      sessionData.currentNode = nextNode;
    }
  }
  return nextNode.method(sessionData);
};

module.exports = {
  response,
};
