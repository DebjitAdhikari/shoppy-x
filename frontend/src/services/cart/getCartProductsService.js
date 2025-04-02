import axios from "axios"
export default async function getCartProductsService(){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart/getAll`,{
        withCredentials:true
      }
      )
      return data
    } catch (err) {
        console.log(err)
    }
}