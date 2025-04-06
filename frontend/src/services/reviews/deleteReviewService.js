import axios from "axios";

export default async function deleteReviewService(id){
    try {
      const {data}= await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/reviews/${id}`,
        {
            withCredentials:true
        }
      )
      return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}