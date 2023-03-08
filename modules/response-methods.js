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
function cancelOrder(curOrder) {
  let message = [];
  if (!curOrder.length) {
    message = ["Order is empty"];
  } else {
    curOrder.length = 0;
    message = ["Current order Cancelled"];
  }
  return { message };
}

function checkout(curOrder, orders) {
  let message;
  if (!curOrder.length) {
    message = ["No order to place"];
  } else {
    orders.push({ date: Date.now(), order: [...curOrder] });

    message = ["Order placed", "--------"];
    total = 0;
    curOrder.forEach((order) => {
      message.push(
        `${order.qty} ${order.item.name} - ${order.qty * order.item.price}`
      );
      total = total + order.qty * order.item.price;
    });
    message.push("------");
    message.push(`total - ${total}`);
    curOrder.length = 0;
  }

  return { message };
}

function orderHistory(curOrder, orders) {
  let message = ["Your order History", "------------"];
  let total = 0;

  orders.forEach((orderObject) => {
    orderObject.order.forEach((item) => {
      message.push(
        `${item.qty} ${item.item.name} - ${item.item.price * item.qty} `
      );
      total = total + item.item.price * item.qty;
    });
    message.push("-------------");
  });
  message.push(`total = ${total}`);

  return { message };
}

function currentOrder(curOrder) {
  let message = [];
  let total = 0;
  if (!curOrder.length) {
    message = ["No item in current order!"];
  } else {
    curOrder.forEach((order) => {
      message.push(
        `${order.qty} ${order.item.name} - ${order.qty * order.item.price}`
      );
      total = total + order.qty * order.item.price;
    });
    message.push(`----------------`);
    message.push(`total = ${total}`);
  }
  return { message };
}

function listItem() {
  this.removeChildren();

  let items = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../", "data", "item.json"), "utf8")
  );

  let message = [];
  let start = 0;
  let max = 5;

  this.addChild(0, cancel);
  message.push(`select 0 to cancel`);

  for (let index = start; index < max; index++) {
    this.addChild(index + 1, itemSelect, items[index]);
    message.push(
      `select ${index + 1} for ${items[index].name} @${items[index].price}`
    );
  }

  this.addChild(99, listItem);
  message.push(`select 99 to see more items`);

  return { message };
}

function itemSelect() {
  for (let i = 1; i <= 9; i++) {
    this.addChild(i, PlaceOrder, this.item);
  }

  let message = [`how many ${this.item.name}? [1 to 9]`];
  this.addChild(0, cancel);
  message.push(`select 0 to cancel`);
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

function cancel() {
  message = ["-"];
  return { message };
}

module.exports = {
  start,
  cancelOrder,
  checkout,
  orderHistory,
  currentOrder,
  listItem,
};
