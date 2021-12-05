const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db");
const { JWT_SECRET } = process.env;

// set `req.user` if possible
// apiRouter.use(async (req, res, next) => {
//   const prefix = "Bearer ";
//   const auth = req.header("Authorization");
//   if (!auth) {
//     // nothing to see here
//     next();
//   } else if (auth.startsWith(prefix)) {
//     const token = auth.slice(prefix.length);
//     try {
//       const { id } = jwt.verify(token, JWT_SECRET);
//       if (id) {
//         req.user = await getUserById(id);
//         next();
//       }
//     } catch ({ name, message }) {
//       next({ name, message });
//     }
//   } else {
//     next({
//       name: "AuthorizationHeaderError",
//       message: `Authorization token must start with ${prefix}`,
//     });
//   }
// });
// apiRouter.use((req, res, next) => {
//   if (req.user) {
//     console.log("User is set:", req.user);
//   }
//   next();
// });
apiRouter.get("/", (req, res, next) => {
  console.log("Request was made to /")
  res.send({
    message: "API is under construction!"
  });
  next()
});
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const sellersRouter = require("./sellers")
apiRouter.use("/sellers", sellersRouter)

const productsRouter = require("./products")
apiRouter.use("/products", productsRouter)

const ordersRouter = require("./orders")
apiRouter.use("/orders", ordersRouter)

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
