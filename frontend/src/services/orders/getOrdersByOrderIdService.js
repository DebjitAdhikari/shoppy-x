import axios from "axios";

export default async function getOrdersByOrderIdService(id){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders/${id}`,
        {
            withCredentials:true
        }
      )
      return data
    } catch (err) {
        console.log(err.response)
        return err.response
    }
}