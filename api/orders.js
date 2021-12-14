const express = require("express");
const ordersRouter = express.Router();
const jwt = require("jsonwebtoken");

const {
  getAllOrders,
  createOrder,
  getOpenOrderById,
  addProductToOrder,
  closeOrder,
  updateCart,
  checkOut,
} = require("../db");

ordersRouter.get("/", async (req, res) => {
  console.log("request to orders");
  const orders = await getAllOrders();

  res.send({
    orders,
  });
});

ordersRouter.post("/myorder", async (req, res) => {
  console.log("request to orders my guy");
  console.log("this is req.body",req.body)
  const { id } = req.body
  console.log(id)
  try {
    const order = await getOpenOrderById(id);
    console.log("this is order", order);
    // const cart = await checkOut(order);
    // console.log("this is cart", cart)
    res.send({
      order,
      // cart,
    });
  } catch (error) {
    throw error;
  }
});

ordersRouter.post("/", async (req, res, next) => {
  console.log("request to orders.post/");
  const { userId, products, isOpen } = req.body;
  try {
    const order = await createOrder(req.body);

    res.send({
      order,
      message: "congrats you did it!",
    });
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/", async (req, res, next) => {
  console.log("request to orders.patch/");
  const { id, string } = req.body;
  try {
    const order = await closeOrder(id, string);
    const order2 = await createOrder({
      userId: id,
      products: "{0}",
      isOpen: true,
    });
    const user = await updateCart(id, 0);

    res.send({
      order,
      order2,
      user,
      message: "congrats you did it!",
    });
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/products", async (req, res, next) => {
  console.log("request to orders.patch/products");
  const { add, productId, userId } = req.body;
  try {
    const order = await addProductToOrder(add, productId, userId);

    res.send({
      order,
      message: "congrats you did it!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
