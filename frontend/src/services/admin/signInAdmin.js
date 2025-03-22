import axios from "axios";

export default async function signInAdmin(formData){
    try {
      const data = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/signIn`,
        formData,
        {
            headers:{"Content-Type":"application/json"},
            withCredentials:true
        }
      )
      return data
      
    } catch (err) {
        throw new Error(err)
    }
}