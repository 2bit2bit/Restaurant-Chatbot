const { json } = require('express');
const fs = require('fs')
const path = require('path')

class Node {
  constructor(index, method, parent) {
    this.index = index;
    this.method = method;
    this.parent = parent;
    this.children = {};
  }

  addChild(index, data) {
    let newNode = new Node(index, data, this);
    newNode.parent.children[index] = newNode;
  }
}

class DecisionGraph {
  constructor(method) {
    this.root = new Node(null, method, null);
  }
}

const responseGraph = new DecisionGraph(start);

responseGraph.root.addChild(0, "Cancel");
responseGraph.root.addChild(1, listItem);
responseGraph.root.addChild(99, "Checkout");
responseGraph.root.addChild(98, "Order History");
responseGraph.root.addChild(97, "Current order");

responseGraph.root.children[1].addChild(0, responseGraph.root[0]);
responseGraph.root.children[1].addChild(1, "food item");
responseGraph.root.children[1].addChild(99, responseGraph.root.children[1]);

responseGraph.root.children[98].addChild(99, responseGraph.root.children[98]);

module.exports = {
  responseGraph,
};

// console.log(responseGraph.root.method())

/// various method

function start() {
  message = [
    "Select 1 to Place an order",
    "Select 99 to checkout order",
    "Select 98 to see order history",
    "Select 97 to see current order",
    "Select 0 to cancel order",
  ];

  return { message };
}

function listItem() {
  let items = JSON.parse(fs.readFileSync(path.join( __dirname, '../','data', 'item.json'), 'utf8'))

  let message = []
  items.forEach((item, index) => {
    message.push(`select ${index} for ${item.name} @${item.price}`)
  });

  // add the elements to graph node, implement remove to remove them
  
  return {message}
}

listItem()
