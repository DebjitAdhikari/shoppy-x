import axios from "axios";

export default async function deleteCategoryService(id){
    try {
      const {data}= await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/categories/${id}`)
      return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}