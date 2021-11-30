import axios from "axios";
const BASE = "https://zaxbys123.herokuapp.com/api"

export async function getAllProducts(){
    try {
    const { data } = await axios.get(`${BASE}/products`)
    
        console.log("this is all products" , data)
        return data 
    } catch (error) {
        
    }
}