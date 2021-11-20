const express = require("express");
const ProductsRouter = express.Router();
const jwt = require("jsonwebtoken");

const { createProduct } = require("../db/products");

ProductsRouter.use((req, res, next) => {
  console.log("A request is being made to /products");

  next(); // THIS IS DIFFERENT
});

ProductsRouter.get("/", async (req, res) => {
  console.log("request to products");
  const products = await createProduct();

  res.send({
    products,
  });
});

ProductsRouter.post("/register", async (req, res, next) => {
  const { name, description, price, category } = req.body;

  try {
    const _products = await getUserByUsername(username);

    if (_products) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

    const products = await createUser({
      name,
      description,
      price,
      category,
    });

    const token = jwt.sign(
      {
        id: products.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "thank you for signing up",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = ProductsRouter;
