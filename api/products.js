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

// productsRouter.post("/register", async (req, res, next) => {
//   const { name, description, price, category } = req.body;

//   try {
//     const _products = await getUserByUsername(username);

//     if (_products) {
//       next({
//         name: "UserExistsError",
//         message: "A user by that username already exists",
//       });
//     }

//     const products = await createUser({
//       name,
//       description,
//       price,
//       category,
//     });

//     const token = jwt.sign(
//       {
//         id: products.id,
//         username,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1w",
//       }
//     );

//     res.send({
//       message: "thank you for signing up",
//       token,
//     });
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

module.exports = productsRouter;
