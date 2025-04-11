import axios from "axios"
export default async function getAllCouponsService(){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/coupons/getAll`)
      return data
    } catch (err) {
        console.log(err)
    }
}