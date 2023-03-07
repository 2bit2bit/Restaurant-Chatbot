const method = require("./response-methods");

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
}

class DecisionGraph {
  constructor() {
    this.root = new Node(null, method.start, null);
    this.root.addChild(0, method.cancel);
    this.root.addChild(1, method.listItem);
    this.root.addChild(99, method.checkout);
    this.root.addChild(98, method.orderHistory);
    this.root.addChild(97, method.currentOrder);

    this.root.children[1].addChild(0, this.root[0]);
    this.root.children[1].addChild(99, this.root.children[1]);
  }
}

module.exports = {
  DecisionGraph,
};
