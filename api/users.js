const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
let to = []

const { getAllUsers, getUserByUsername, createUser } = require("../db/users");

// UPDATE
usersRouter.get("/", async (req, res) => {
  console.log("request to users");
  const users = await getAllUsers();


  res.send({
    users, to
  });
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, cart, canSell } = req.body;

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
      cart,
      canSell
    });

    const token = jwt.sign(
      {
        id: user.id,
        username: username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    to.push({
      username: username,
      token: token
    })
    
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
