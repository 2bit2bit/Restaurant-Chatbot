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
  return message;
}
function cancelOrder(sessionData) {
  let message = [];
  if (!sessionData.curOrder.length) {
    message = ["Order is empty"];
  } else {
    sessionData.curOrder.length = 0;
    message = ["Current order Cancelled"];
  }
  return message;
}

function checkout(sessionData) {
  let message;
  if (!sessionData.curOrder.length) {
    message = ["No order to place"];
  } else {
    orders.push({ date: Date.now(), order: [...sessionData.curOrder] });

    message = ["Order placed", "--------"];
    total = 0;
    sessionData.curOrder.forEach((order) => {
      message.push(
        `${order.qty} ${order.item.name} - ${order.qty * order.item.price}`
      );
      total = total + order.qty * order.item.price;
    });
    message.push("------");
    message.push(`total - ${total}`);
    sessionData.curOrder.length = 0;
  }

  return message;
}

function orderHistory(sessionData) {
  let message = ["Your order History", "------------"];
  let total = 0;

  sessionData.orders.forEach((orderObject) => {
    orderObject.order.forEach((item) => {
      message.push(
        `${item.qty} ${item.item.name} - ${item.item.price * item.qty} `
      );
      total = total + item.item.price * item.qty;
    });
    message.push("-------------");
  });
  message.push(`total = ${total}`);

  return message;
}

function currentOrder(sessionData) {
  let message = [];
  let total = 0;
  if (!sessionData.curOrder.length) {
    message = ["No item in current order!"];
  } else {
    sessionData.curOrder.forEach((order) => {
      message.push(
        `${order.qty} ${order.item.name} - ${order.qty * order.item.price}`
      );
      total = total + order.qty * order.item.price;
    });
    message.push(`----------------`);
    message.push(`total = ${total}`);
  }
  return message;
}

function listItem(sessionData) {
  this.removeChildren();
  let message = [];
  let max = 5;
  let start;

  if (sessionData.listStartIndex) {
    start = startIndex;
  } else {
    start = 0;
  }

  let items = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../", "data", "item.json"), "utf8")
  );

  this.addChild(0, cancel);
  message.push(`select 0 to cancel`);

  for (let index = start; index < max; index++) {
    this.addChild(index + 1, itemSelect, items[index]);
    message.push(
      `select ${index + 1} for ${items[index].name} @${items[index].price}`
    );
  }

  if (sessionData.listStartIndex + max < items.length) {
    this.addChild(99, listItem);
    message.push(`select 99 to see more items`);
  }

  return message;
}

function itemSelect() {
  for (let i = 1; i <= 9; i++) {
    this.addChild(i, PlaceOrder, this.item);
  }

  let message = [`how many ${this.item.name}? [1 to 9]`];
  this.addChild(0, cancel);
  message.push(`select 0 to cancel`);
  return message;
}

function PlaceOrder(sessionData) {
  sessionData.curOrder.push({
    item: this.item,
    qty: this.index,
  });
  let message = [`${this.index} ${this.item.name} added to order`];
  return message;
}

function cancel() {
  message = ["-"];
  return message;
}

module.exports = {
  start,
  cancelOrder,
  checkout,
  orderHistory,
  currentOrder,
  listItem,
};
