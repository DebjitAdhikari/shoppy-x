import axios from "axios";

export default async function getCategoryByValueService(category){
    try {
      const {data}= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories/getName/${category}`)
      return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}