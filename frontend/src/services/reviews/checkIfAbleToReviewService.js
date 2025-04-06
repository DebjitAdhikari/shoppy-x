import axios from "axios"
export default async function checkIfAbleToReviewService(id){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reviews/checkReviewed/${id}`, 
        { 
          withCredentials:true
        }
      )
      return data
    } catch (err) {
        console.log(err)
        return err.response
    }
}