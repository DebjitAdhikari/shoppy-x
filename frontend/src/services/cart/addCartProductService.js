import axios from "axios"
export default async function addCartProductService(formData){
    try {
      
      const {data} = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/cart/addNewProduct`,
        formData,
        {
            headers:{"Content-Type":"application/json"},
            withCredentials:true
        }
      )
      return data
    } catch (err) {
        console.log(err)
        return err.response
    }
}