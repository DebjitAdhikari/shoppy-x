import axios from "axios";

export default async function getProductsByCategoryService(category,page){
    try {
      console.log("going",category)
      const {data}= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/getByCategory/${category}?page=${page}`)
      return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}