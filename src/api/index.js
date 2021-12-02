import axios from "axios";
import { getToken, storeToken, storeUser } from "../auth";
// const BASE = "https://floating-depths-70534.herokuapp.com/api"
const BASE = "http://localhost:5000/api"
export async function getAllProducts(){
    try {
        console.log("trying to get all products")
    const { data } = await axios.get(`${BASE}/products`)
    
        console.log("this is all products" , data)
        return data.products
    } catch (error) {
        throw error
    }
}

export async function registerUser(username, password) {
    try {
      const { data } = await axios.post(`${BASE}/register`, {
        username: username,
        password: password,
      });
    //   console.log(data);
      console.log(data)
      storeToken(data.token);
      storeUser(data.user.username);
      console.log(data.token);
      return data;
    } catch (error) {
      throw error;
    }
  } 

  export async function loginUser(username, password) {
    try {
      const { data } = await axios.post(`${BASE}/login`, {
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