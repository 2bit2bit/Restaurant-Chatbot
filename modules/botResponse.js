const response = (msg, sessionData) => {
  let responseMessage;
  let nextNode;
  if (!msg) {
    nextNode = sessionData.currentNode;
  } else {
    sessionData.sessionMessages.push({ sender: "user", message: [msg] });
    if (sessionData.currentNode.index == "greeting") {
      nextNode = sessionData.currentNode;
      responseMessage = {
        sender: "bot",
        message: nextNode.method(sessionData, msg),
      };
      sessionData.sessionMessages.push(responseMessage);
      return responseMessage;
    } else {
      if (!sessionData.currentNode.children[msg]) {
        responseMessage = {
          sender: "bot",
          message: [
            "invalid input",' ',
            ...sessionData.sessionMessages[
              sessionData.sessionMessages.length - 2
            ].message,
          ],
        };
        console.log(responseMessage);
        sessionData.sessionMessages.push(responseMessage);
        return responseMessage;
      }
      nextNode = sessionData.currentNode.children[msg];
      sessionData.currentNode = nextNode;
    }
  }

  responseMessage = { sender: "bot", message: nextNode.method(sessionData) };
  sessionData.sessionMessages.push(responseMessage);
  return responseMessage;
};

module.exports = {
  response,
};
