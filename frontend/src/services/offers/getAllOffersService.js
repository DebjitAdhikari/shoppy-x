import axios from "axios"
export default async function createAllOffersService(){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/offers/getAll`)
      return data
    } catch (err) {
        console.log(err)
    }
}