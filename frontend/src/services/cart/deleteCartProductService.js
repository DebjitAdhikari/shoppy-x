import axios from "axios"
export default async function deleteCartProductService(id){
    try {
      const {data} = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/cart/${id}`,
        {
          withCredentials:true
        }
      )
      return data
    } catch (err) {
        console.log(err)
    }
}