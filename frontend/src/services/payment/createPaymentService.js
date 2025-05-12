import axios from "axios";

export default async function createPaymentService(orderData){
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payments/create-checkout-session`,
        orderData,
        {
            withCredentials:true
        }
      )
      return data
    } catch (err) {
        console.log(err)
    }
}