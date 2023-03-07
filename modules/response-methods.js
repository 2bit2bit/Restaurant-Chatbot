const path = require("path");
const fs = require("fs");

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

function checkout(curOrder, orders) {
  orders.push({ date: Date.now(), order: curOrder });
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
  for (let i = 1; i <= 9; i++) {
    this.addChild(i, PlaceOrder, this.item);
  }

  let message = [`how many ${this.item.name}? [1 to 9]`];
  return { message };
}

function PlaceOrder(curOrder) {
  curOrder.push({
    item: this.item,
    qty: this.index,
  });
  let message = [`${this.index} ${this.item.name} added to order`];
  return { message };
}

module.exports = {
  start,
  cancel,
  checkout,
  orderHistory,
  currentOrder,
  listItem,
};
