const express = require("express");
const jwt = require("jsonwebtoken");
const {createInitialUsers,
getAllUsers, createUser} = require(../db/users);
const usersRouter = express.Router();






usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      return;
    }

    if (password.length < 8) {
      return;
    }

    const newUser = await createUser(username, password);

    res.send(newUser);
  } catch (error) {
    throw error;
  }
});


const user = await createUser({
      username,
      password,
      name,
      location,
    });


usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next(); // THIS IS DIFFERENT
});

usersRouter.get("/", (req, res) => {
  try {
    const users = await getAllUsers();

    res.send({
      users,
    });
  } catch (error) {}
});

// UPDATE
usersRouter.post("/register", async (req, res, next) => {
  const { id, name, password, token, cart, [] } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

    const user = await createUser({
       id, name, password, token, cart,
    },[]);

    const token = jwt.sign(
      {
        id: user.id,
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

    if (user && user.password == password) {
      // create token & return to user
      res.send({ message: "you're logged in!" });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
module.exports = usersRouter;