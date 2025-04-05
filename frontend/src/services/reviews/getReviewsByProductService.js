import axios from "axios";

export default async function getReviewsByProductService(id){
    try {
      const {data}= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reviews/getReviewsOfProduct/${id}`)
      return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}