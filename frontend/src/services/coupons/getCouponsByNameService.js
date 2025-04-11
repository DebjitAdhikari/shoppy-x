import axios from "axios"
export default async function getCouponByNameService(couponName){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/coupons/get/${couponName}`)
      return data
    } catch (err) {
        console.log(err)
        return err.response.data
    }
}