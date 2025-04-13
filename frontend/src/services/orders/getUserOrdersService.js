import axios from "axios";

export default async function getUserOrdersService(){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders/getUserOrders`,
        {
            withCredentials:true
        }
      )
      return data
    } catch (err) {
        console.log(err.response)
    }
}