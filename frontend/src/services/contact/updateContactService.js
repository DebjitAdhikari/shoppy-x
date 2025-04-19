import axios from "axios";

export default async function updateContactService(formData){
    try {
      const {data} = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/contact/`,
        formData,
        {
            headers:{
                "Content-Type":"application/json"
            }
        }
      )
      return data
    } catch (err) {
        console.log(err.response)
    }
}