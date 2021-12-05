const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;
const { getAllUsers, getUserByUsername, createUser } = require("../db/users");

// UPDATE
usersRouter.get("/", async (req, res) => {
  console.log("request to users");
  const users = await getAllUsers();

  res.send({
    users,
  });
});

usersRouter.post("/login", async (req, res, next) => {
  console.log("request being made to /login")
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }
  
  try {
    const user = await getUserByUsername(username);
      console.log("this is user", user)
    if (user && user.password == password) {
      
      const token = jwt.sign(
        { id: user.id, username: user.username }, JWT_SECRET, 
        {
          expiresIn: "1h",
        }
      );
      console.log("this is token",token)
      res.send({user, token, message: "you are logged in!"});
    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Your username or password is incorrect'
      });
    }
  } catch(error) {
    console.log(error);
    next(error);
  }
});


usersRouter.post("/register", async(req, res, next)=>{
  console.log("request being made to /register")
  const {username, password} = req.body
  console.log(username, password)
  console.log(req.body)
  try {
    const queriedUser = await getUserByUsername(username);
    console.log(queriedUser,"queriedUser")
    if (queriedUser) {
      res.status(401)
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    } else if (password.length<8){
      res.status(401)

      next({
        name: 'PasswordLengthError',
        message: 'Password Too Short!'
      })
    } else {
      const user = await createUser({
        username,
        password
      })
      console.log(user,"user")
      if(!user){
        next({
          name: 'UserError',
          message: 'There was a problem registering user'
        })
      } else {
        const token = jwt.sign({ 
          id: user.id, 
          username: user.username
        }, JWT_SECRET, {
          expiresIn: '1w'
        });
        console.log(token,"Token")
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
