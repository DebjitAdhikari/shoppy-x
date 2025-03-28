import axios from "axios";

export default async function createCategoryService(formData){
    try {
      const {data}= await axios.post(`${import.meta.env.VITE_API_BASE_URL}/categories/create`,formData,
        { 
            headers:{"Content-Type":"multipart/form-data"},
            withCredentials: true 
        }
      )
      return data
    } catch (err) {
        console.log(err)
        return (err.response)
    }
}