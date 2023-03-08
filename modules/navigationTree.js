const methods = require("./response-methods");

class Node {
  constructor(index, method, parent, item) {
    this.index = index;
    this.method = method;
    this.item = item;
    this.parent = parent;
    this.children = {};
  }

  addChild(index, method, item) {
    let newNode = new Node(index, method, this, item);
    newNode.parent.children[index] = newNode;
  }

  removeChildren() {
    this.children = {}
  }
}

class NavigationTree {
  constructor() {
    this.root = new Node(null, methods.start, null);
    this.root.addChild(0, methods.cancelOrder);
    this.root.addChild(1, methods.listItem);
    this.root.addChild(99, methods.checkout);
    this.root.addChild(98, methods.orderHistory);
    this.root.addChild(97, methods.currentOrder);
  }
}

module.exports = {
  NavigationTree,
};
