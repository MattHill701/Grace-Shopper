const express = require("express");
const productsRouter = express.Router();
const jwt = require("jsonwebtoken");

const { getAllProducts } = require("../db");

productsRouter.get("/", async (req, res) => {
  console.log("request to products");
  const products = await getAllProducts();

  res.send({
    products,
  });
});


module.exports = productsRouter;
