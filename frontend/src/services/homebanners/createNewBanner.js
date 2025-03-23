import axios from "axios";

export default async function createNewBanner(formData){
    try {
      const {data}= await axios.post(`${import.meta.env.VITE_API_BASE_URL}/banners/create`,formData,
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