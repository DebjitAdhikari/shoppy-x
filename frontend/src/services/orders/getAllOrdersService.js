import axios from "axios";

export default async function getAllOrdersService(){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders/getAll`)
      return data
    } catch (err) {
        console.log(err.response)
        return err.response
    }
}