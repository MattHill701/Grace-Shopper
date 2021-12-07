const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET="neverTell" } = process.env
require("dotenv").config();

const { getAllUsers, getUserByUsername, createUser } = require("../db/users");

// UPDATE
usersRouter.get("/", async (req, res) => {
  console.log("request to users");
  const users = await getAllUsers();

  res.send({
    users,
  });
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  let cart = "0"
  let canSell = false
  console.log(username, password, cart, canSell)
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
console.log("this is user", user)
    if(!user){
      next({
        name: 'UserCreationError',
        message: 'There was a problem registering you. Please try again.'
      })
    }

    const token = await jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
        JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
console.log("this is token", token)
    if(!token){
      next({
        name: 'TokenCreationError',
        message: 'There was a problem registering you. Please try again.'
      })
    }

    res.send({
      message: "thank you for signing up",
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
