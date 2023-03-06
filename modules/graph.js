class Node {
  constructor(index, data, parent) {
    this.index = index;
    this.data = data;
    this.parent = parent;
    this.children = {};
  }

  addChild(index, data) {
    let newNode = new Node(index, data, this);
    newNode.parent.children[index] = newNode;
  }
}

class DecisionGraph {
  constructor() {
    this.root = new Node(null, "root", null);
  }
}

const responseGraph = new DecisionGraph();

responseGraph.root.addChild(0, "Cancel");
responseGraph.root.addChild(1, "List Name");
responseGraph.root.addChild(99, "Checkout");
responseGraph.root.addChild(98, "Order History");
responseGraph.root.addChild(97, "Current order");   

responseGraph.root.children[1].addChild(0, responseGraph.root[0])
responseGraph.root.children[1].addChild(1, 'food item')
responseGraph.root.children[1].addChild(99, responseGraph.root.children[1])

responseGraph.root.children[98].addChild(99, responseGraph.root.children[98])

console.log(responseGraph.root.children[98]);


module.exports = {
    responseGraph
} 