import axios from "axios"
export default async function getAllCuponsService(){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cupons/getAll`)
      return data
    } catch (err) {
        console.log(err)
    }
}