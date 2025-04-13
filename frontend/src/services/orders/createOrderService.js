import axios from "axios";

export default async function(formData){
    try {
      const data = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/orders/create`,
        formData,
        {
            headers:{"Content-Type":"application/json"},
            withCredentials:true
        }
      )
      return data
    } catch (err) {
        console.log(err.response)
    }
}