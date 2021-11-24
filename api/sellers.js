const express = require("express");
const sellersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getAllSellers } = require("../db");

sellersRouter.get("/", async (req, res) => {
  console.log("request to sellers");
  const sellers = await getAllSellers();
  console.log(sellers)
  res.send({
    sellers,
  });
});

// sellersRouter.post("/register", async (req, res, next) => {
//   const { username, password, description } = req.body;

//   try {
//     const _user = await getUserByUsername(username);

//     if (_user) {
//       next({
//         name: "UserExistsError",
//         message: "A user by that username already exists",
//       });
//     }

//     const user = await createUser({
//       username,
//       password,
//       description,
//     });

//     const token = jwt.sign(
//       {
//         id: sellers.id,
//         username,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1w",
//       }
//     );

//     res.send({
//       message: "Thank you for your purchase!",
//       token,
//     });
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

module.exports = sellersRouter;
