const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;
console.log(JWT_SECRET)
const { getAllUsers, getUserByUsername, createUser } = require("../db/users");

// UPDATE
usersRouter.get("/", async (req, res, next) => {
  console.log("request to users");
  const users = await getAllUsers();

  res.send({
    users,
  });
});

usersRouter.post('/register', async (req, res, next) => {
  console.log("request to users/register");
  const { username, password, cart, canSell } = req.body;
  console.log("this is req.body", username, password, cart, canSell)
  try {
    const queriedUser = await getUserByUsername(username);

    if (queriedUser) {
      res.status(401)
      
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    } else if (password.length<4){
      res.status(401)

      next({
        name: 'PasswordLengthError',
        message: 'Password Too Short!'
      })
    } else {
      const user = await createUser({
        username: username,
        password: password,
        cart: '{0}',
      })
      console.log(user, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      if(!user){
        next({
          name: 'UserCreationError',
          message: 'There was a problem registering you. Please try again.'
        })
      } else {
        const token = jwt.sign({ 
          id: user.id, 
          username: user.username
        }, JWT_SECRET, {
          expiresIn: '1w'
        });

        res.send({ 
          user,
          message: "you're signed up!",
          token 
        });
      }
    }
  } catch (error) {
    next (error)
  } 
});

module.exports = usersRouter;
