import axios from "axios"
export default async function checkProductInCartService(id){
    try {
      const data = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart/checkProduct/${id}`,
        {
          withCredentials:true
        }
      )
      return data
    } catch (err) {
        console.log(err)
    }
}