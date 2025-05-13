import axios from "axios"
export default async function getContact(){
    try {
      const {data}=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/contact`)
      return data
    } catch (err) {
        console.log(err)
    }
}