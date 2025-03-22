import axios from "axios";

export default async function updateMyPassword(formData){
    try {
      const data = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/users/updateMyPassword`,
        formData,
        {
          headers:{"Content-Type":"application/json"},
          withCredentials:true
        }
      )
      console.log(data)
      return data
      
    } catch (err) {
        console.log(err)
        return err.response.data
    }
    
}