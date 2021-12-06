const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
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

    if(!user){
      next({
        name: 'UserCreationError',
        message: 'There was a problem registering you. Please try again.'
      })
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

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
