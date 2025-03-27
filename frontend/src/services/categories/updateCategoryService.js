import axios from "axios";

export default async function updateCategoryService(id,formData){
    try {
      const {data}= await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/categories/${id}`,formData,
        { 
            headers:{"Content-Type":"multipart/form-data"},
            withCredentials: true 
        }
      )
      return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}