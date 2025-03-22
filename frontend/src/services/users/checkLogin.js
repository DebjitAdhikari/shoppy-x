import axios from "axios";

export default async function checkLogin(){
    try {
      const data = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/checkAuth`,
        {withCredentials:true}
      )
      return data
    } catch (err) {
        console.log(err)
        return {status:"failed", message:"Not Logged in"}
    }
}