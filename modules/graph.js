const fs = require("fs");
const path = require("path");

class Node {
  constructor(index, method, parent, item) {
    this.index = index;
    this.method = method;
    this.item = item
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
    this.root = new Node(null, start, null);
    this.root.addChild(0, cancel);
    this.root.addChild(1, listItem);
    this.root.addChild(99, checkout);
    this.root.addChild(98, orderHistory);
    this.root.addChild(97, currentOrder);

    this.root.children[1].addChild(0, this.root[0]);
    this.root.children[1].addChild(99, this.root.children[1]);

    this.root.children[98].addChild(99, this.root.children[98]);
  }
}

module.exports = {
  DecisionGraph,
};

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

function cancel() {
  let message = ["Cancel"];
  return { message };
}

function checkout() {
  let message = ["checkout"];
  return { message };
}

function orderHistory() {
  let message = ["orderHistory"];
  return { message };
}

function currentOrder() {
  let message = ["currentOrder"];
  return { message };
}

function listItem() {
  let items = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../", "data", "item.json"), "utf8")
  );

  items.forEach((item, index) => {
    this.addChild(index + 1, itemSelect, item);
  });

  let message = [];
  items.forEach((item, index) => {
    message.push(`select ${index + 1} for ${item.name} @${item.price}`);
  });
  return { message };
}

function itemSelect() {
  let message = [`${this.item.name} added to order`];
  return { message };
}
