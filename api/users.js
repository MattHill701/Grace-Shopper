const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET="neverTell" } = process.env
const { getAllUsers, getUserByUsername, createUser, createOrder, updateCart } = require("../db");

// UPDATE
usersRouter.get("/", async (req, res) => {
  console.log("request to users");
  const users = await getAllUsers();


  res.send({
    users, 
  });
});

usersRouter.get("/", async (req, res, next) => {
  console.log("request to users");
  const { id, num } = req.body
  try{
  const cart = await updateCart(id, num);

  res.send({
    cart, 
  });
} catch (error){
  next(error)
}
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, cart, canSell } = req.body;
// console.log("api req.body",username, password, cart, canSell)
  try {
    let notUser = await getUserByUsername(username)
    if(notUser !== undefined){
      res.send("user exists")
    } else{
    let user = await createUser({username, password, cart, canSell})
    console.log("this is user", user)
    const order = await createOrder({
      userId: user.id,
      products: "{0}",
      isOpen: true
    });
    
    console.log("this is order", order)
    const token = jwt.sign(
      {
        id: user.id,
        username: username,
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    console.log("this is token",token)
    res.send({username, order, token})
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
    
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);
    if(user.username === username && user.password === password){
      const token = jwt.sign(
        {
          id: user.id,
          username: username,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      const userId = user.id;
      // console.log(userId)
      // console.log("this is token", token)
      res.send({username, userId, token})
    } else{
      res.send("error, whoopsie daisies!")
    }

  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
