import axios from "axios";

export default async function updateOrderService(id,formData){
    try {
      const {data} = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/orders/${id}`,
        formData,
        {
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        }
      )
      return data
    } catch (err) {
        console.log(err.response)
        return err.response
    }
}