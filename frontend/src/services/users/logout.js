import axios from "axios";

export default async function logout() {
    try {
      const data = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/logout`,
        {},
        {withCredentials:true}
      )
      return data
    } catch (err) {
        throw new Error(err)
    }
}