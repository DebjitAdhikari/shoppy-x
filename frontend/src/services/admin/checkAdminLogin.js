import axios from "axios";

export default async function checkAdminLogin() {
    try {
      const data = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/checkAuth`,
        {withCredentials:true}
      )
      return data
    } catch (err) {
        throw new Error(err)
    }
    
}