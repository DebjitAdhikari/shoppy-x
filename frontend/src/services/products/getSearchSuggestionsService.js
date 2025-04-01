import axios from "axios";

export default async function getSearchSuggestionsService(query,page){
    try {
      const {data}= await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/searchSuggestions?query=${query}&page=${page}`)
      return data
    } catch (err) {
        console.log(err)
        return err.response.data
    }
}