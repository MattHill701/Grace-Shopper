import axios from "axios";
// const BASE = "https://floating-depths-70534.herokuapp.com/api"
const BASE = "http://localhost:5000/api"
import { storeToken, storeUser} from "../auth";
export async function getAllProducts(){
    try {
        // console.log("trying to get all products")
    const { data } = await axios.get(`${BASE}/products`)
    
        // console.log("this is all products" , data)
        return data.products
    } catch (error) {
        throw error
    }
}

export async function registerUser(username, password, cart, canSell) {
  // console.log("this is whats passed in",username, password, cart, canSell);
  try {
    const { data } = await axios.post(`http://localhost:5000/api/users/register`, {
      username: username,
      password: password,
      cart: cart,
      canSell: canSell,
    });
    // console.log("this is register user data",data);
    storeToken(data.token);
    //   storeUser(data.user.username);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(username, password) {
  try {
    const { data } = await axios.post(`http://localhost:5000/api/users/login`, {
      username: username,
      password: password,
    });
    // console.log("this is data from loginUser",data)
    storeToken(data.token);
    // storeUser(data.user.username);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addProductToOrder(add, productId, userId){
  try {
    const data = await axios.patch(`http://localhost:5000/api/orders/products`, {
        add: add,
        productId: productId,
        userId: userId
    })
    // console.log("this is productorder data", data)
    return data
  } catch (error) {
    throw error
  }
}

export async function getOrderById(userId){
  // console.log("this is userId in api", userId)
  // console.log("4")
  try {
    const { data } = await axios.post(`http://localhost:5000/api/orders/myorder`, {
      id: userId
    })
    // console.log("this is all ordersbyId", data)
    return data
  } catch (error) {
    throw error
  }
}

export async function finishCart(order){
//  console.log("this is order", order)
//  console.log("this is order.order.products", order.order.products)
  try {

    const { data } = await axios.post(`http://localhost:5000/api/products/myproducts`,{
   products: order.order.products
    })
    // console.log("this is data from finish cart",data)
    return data
  } catch (error) {
    throw error
  }
}

export async function getAllOrders(){
  try {
      // console.log("trying to get all products")
  const { data } = await axios.get(`${BASE}/orders`)
  
      // console.log("this is all orders" , data)
      return data.orders
  } catch (error) {
      throw error
  }
}

export async function checkOut(id, arr){
  try {
    let string1 = JSON.stringify(arr)
    let string = '(' + string1.substring(1, string1.length - 1) + ')'
      // console.log("trying to get all products")
  const { data } = await axios.patch(`${BASE}/orders`,{
    id: id,
    string: string
     })
  
      // console.log("this is all orders" , data)
      return data.orders
  } catch (error) {
      throw error
  }
}

