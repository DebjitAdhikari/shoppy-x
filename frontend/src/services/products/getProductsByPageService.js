import axios from "axios";

export default async function getProductsByPageService(page){
    try {
      const {data}= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/getLimitedProducts?page=${page}`)
      return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}