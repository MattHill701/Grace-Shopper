const express = require("express");
const ordersRouter = express.Router();
const jwt = require("jsonwebtoken");

const { getAllOrders } = require("../db");

ordersRouter.get("/", async (req, res) => {
  console.log("request to orders");
  const orders = await getAllOrders();

  res.send({
    orders,
  });
});


module.exports = ordersRouter;