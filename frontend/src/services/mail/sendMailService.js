import axios from "axios"
export default async function sendMailService(formData){
    try {
      const data = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/mail/send`,
        formData,
        { 
          headers:{"Content-Type":"application/json"},
          withCredentials: true
      }
      )
      return data
    } catch (err) {
        console.log(err)
    }
}