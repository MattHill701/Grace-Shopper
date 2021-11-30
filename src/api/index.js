import axios from "axios";
const BASE = "https://floating-depths-70534.herokuapp.com/api"

export async function getAllProducts(){
    try {
        console.log("trying to get all products")
    const { data } = await axios.get(`${BASE}/products`, {
        headers: {
            "Content-Type": "application/json",
          },
    })
    
        console.log("this is all products" , data)
        return data 
    } catch (error) {
        throw error
    }
}