import axios from "axios"
export default async function getAllFeaturedProductsService(){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/getAllFeaturedProducts`)
      return data
    } catch (err) {
        console.log(err)
    }
}