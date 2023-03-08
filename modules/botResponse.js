const response = function name(msg, sessionData) {
  let currentNode;
  if (msg) {
    if (!sessionData.currentNode.children[msg]) {
      let message = { message: ["invalid input"] };
      return [message, currentNode];
    }
    currentNode = sessionData.currentNode.children[msg];
  } else {
    currentNode = sessionData.currentNode;
    
  }
  
  let message = currentNode.method(sessionData);
  return message;
};

module.exports = {
  response,
};
