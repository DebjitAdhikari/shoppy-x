import axios from "axios";

export default async function getCategoriesForHomePage(){
    try {
      const {data}= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories/getSome`)
      return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}