import axios from "axios";

export default async function getProductsByQueryService(query,page){
    try {
      const {data}= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/queryProducts?query=${query}&page=${page}`)
      return data
    } catch (err) {
        console.log(err)
        return err.response.data
    }
}