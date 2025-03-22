import axios from "axios";

export default async function getMyDetails(){
    try {
      const {data}= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/getMe`,
        { withCredentials: true }
      )
      return data
    } catch (err) {
        console.log(err)
    }
}