import axios from "axios";

export default async function getAllBanners(){
    try {
      const {data}= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/banners/getAll`,
        { withCredentials: true }
      )
      return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}