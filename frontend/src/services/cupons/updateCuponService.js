import axios from "axios"
export default async function updateCuponService(id,formData){
    try {
      const {data} = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/cupons/${id}`,
        formData,
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