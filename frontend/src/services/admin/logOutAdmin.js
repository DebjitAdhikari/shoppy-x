import axios from "axios";

export default async function logOutAdmin() {
    try {
      const data = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/logOut`,
        null,
        {
            withCredentials:true
        }
      )
      return data
    } catch (err) {
        throw new Error(err)
    }
    
}