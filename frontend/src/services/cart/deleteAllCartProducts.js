import axios from "axios"
export default async function deleteAllCartProducts(){
    try {
      const {data} = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/cart/deleteCartProducts`,
        {
            headers:{"Content-Type":"application/json"},
            withCredentials:true
        }
      )
      return data
    } catch (err) {
        console.log(err)
    }
}