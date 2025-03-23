import axios from "axios"
export default async function getAllProducts(){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/getAll`)
      return data
    } catch (err) {
        console.log(err)
    }
}