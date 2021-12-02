import axios from "axios";
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