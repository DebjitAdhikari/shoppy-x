import axios from "axios";

export default async function creatReviewService(formData){
    try {
      const {data}= await axios.post(`${import.meta.env.VITE_API_BASE_URL}/reviews/create`,
        formData,
        {
            headers:{"Content-Type":"multipart/form-data"},
            withCredentials:true
        }
      )
      return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}