const express = require("express");
const productsRouter = express.Router();
const jwt = require("jsonwebtoken");

const { getAllProducts, createProduct, deleteProduct, updateProduct, addProductToSeller, removeProductFromOrder, removeProductFromSeller, checkOut  } = require("../db");

productsRouter.get("/", async (req, res) => {
  console.log("request to products");
  const products = await getAllProducts();

  res.send({
    products,
  });
});

productsRouter.post("/", async (req, res, next) => {
  const { sellerId, name, description, price, category, inventory, picture } = req.body
  try{
  const product = await createProduct({ name, description, price, category, inventory, picture });
  const seller =  await addProductToSeller(product.id, sellerId)
  

  res.send({
    product, seller
  });
} catch (error){
  next(error);
}
});

productsRouter.delete("/", async (req, res, next) => {

  const { id } = req.body

  try{
  const product = await deleteProduct(id);
  const orders = await removeProductFromOrder(id)
  const seller = await removeProductFromSeller(id)

  res.send({
    product, orders, seller
  });
} catch (error){
  next(error);
}
});

// productsRouter.patch("/", async (req, res, next) => {

//   const { id, name, description, price, category, inventory, picture } = req.body

//   try{
//   const product = await updateProduct( id, name, description, price, category, inventory, picture );

//   res.send({
//     product,
//   });
// } catch (error){
//   next(error);
// }
// });

productsRouter.post("/myproducts", async (req, res, next) => {
  console.log("request to products/myproducts");
  try{
    console.log("this is req.body",req.body)
  const products = await checkOut(req.body);
console.log("this is products", products)
  res.send({
    products,
  });
} catch(error){
  next(error)
}
});


module.exports = productsRouter;
