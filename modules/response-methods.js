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
};
function cancel() {
  let message = ["Cancel"];
  return { message };
};

function checkout() {
  let message = ["checkout"];
  return { message };
};

function orderHistory() {
  let message = ["orderHistory"];
  return { message };
};

function currentOrder() {
  let message = ["currentOrder"];
  return { message };
};

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
};

function itemSelect() {
  let message = [`${this.item.name} added to order`];
  return { message };
};


module.exports = {
    start,
    cancel,
    checkout,
    orderHistory,
    currentOrder,
    listItem
}
