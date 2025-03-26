import axios from "axios"
export default async function updateProductService(id,formData){
    try {
      const {data} = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
        formData,
        { headers:{"Content-Type":"multipart/form-data"}}
      )
      return data
    } catch (err) {
        console.log(err)
    }
}