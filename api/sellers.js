const express = require("express");
const sellersRouter = express.Router();
const jwt = require("jsonwebtoken");

const { getAllSellers } = "../db/sellers.js";

sellersRouter.use((req, res, next) => {
  console.log("A request is being made to /sellers");

  next(); // THIS IS DIFFERENT
});

// UPDATE
sellersRouter.get("/sellers", async (req, res) => {
  console.log("request to sellers");
  const users = await getAllSellers();

  res.send({
    sellers,
  });
});

sellersRouter.post("/register", async (req, res, next) => {
  const { username, password, description } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

    const user = await createUser({
      username,
      password,
      description,
    });

    const token = jwt.sign(
      {
        id: sellers.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Thank you for your purchase!",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = sellersRouter;
