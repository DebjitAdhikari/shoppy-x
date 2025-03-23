import axios from "axios";

export default async function deleteBannerService(id){
    try {
      const {data}= await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/banners/${id}`,
        { withCredentials: true }
      )
      return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}