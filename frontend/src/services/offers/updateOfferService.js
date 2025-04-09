import axios from "axios"
export default async function updateProductService(id,formData){
    try {
      const {data} = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/offers/${id}`,
        formData,
        { 
          headers:{"Content-Type":"multipart/form-data"},
          withCredentials:true
      }
      )
      return data
    } catch (err) {
        console.log(err)
        return err.response
    }
}