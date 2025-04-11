import axios from "axios"
export default async function deleteCouponService(id){
    try {
      const {data} = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/coupons/${id}`)
      return data
    } catch (err) {
        console.log(err)
    }
}