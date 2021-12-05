import axios from "axios";
import { getToken, storeToken, storeUser } from "../auth";
// const BASE = "https://floating-depths-70534.herokuapp.com/api"
const BASE = "http://localhost:5000/api"


export async function getAllProducts(){
    try {
        // console.log("trying to get all products")
    const { data } = await axios.get(`http://localhost:5000/api/products`)
    
        // console.log("this is all products" , data)
        return data.products
    } catch (error) {
        throw error
    }
}

export async function registerUser(username, password) {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/users/register`, {
        username: username,
        password: password
      });

      console.log("THIS IS DATA",data)
      // storeToken(data.token);
      // storeUser(data.user.username);
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
      storeToken(data.token);
      storeUser(data.user.username);
      return data;
    } catch (error) {
      throw error;
    }
  }