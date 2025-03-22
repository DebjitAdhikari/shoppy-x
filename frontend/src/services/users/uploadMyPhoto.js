import axios from "axios";

export default async function uploadMyPhoto(formData){
    try {
      const data = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/users/updateMyPhoto`,
        formData,
        {
          headers:{"Content-Type":"multipart/form-data"},
          withCredentials:true
        }
      )
      console.log(data)
      return data
      
    } catch (err) {
     throw new Error(err)
    }
    
}