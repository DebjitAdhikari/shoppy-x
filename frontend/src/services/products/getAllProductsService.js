import axios from "axios"
export default async function getAllProductsService(){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/getAll`)
      return data
    } catch (err) {
        console.log(err)
    }
}