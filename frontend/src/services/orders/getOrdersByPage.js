import axios from "axios";

export default async function getOrdersByPage(page){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders/getLimitedOrders?page=${page}`)
      return data
    } catch (err) {
        console.log(err.response)
        return err.response
    }
}