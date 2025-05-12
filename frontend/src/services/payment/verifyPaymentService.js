import axios from "axios";

export default async function verifyPaymentService(id){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/payments/verify-checkout-session?session_id=${id}`,
       
        {
          // params:{session_id:id},
            withCredentials:true
        }
      )
      return data
    } catch (err) {
      console.error("Payment verification error:", err)
      throw err
    }
}