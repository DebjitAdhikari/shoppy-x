import axios from "axios";

export default async function getProductById(productId){
    try {
      const {data}= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${productId}`)
      return data
    } catch (err) {
        console.log(err)
    }
}