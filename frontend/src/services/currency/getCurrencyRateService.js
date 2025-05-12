import axios from "axios";

export default async function getCurrencyRateService(){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/currencyRate/getRate`)
      return data
    } catch (err) {
        console.log(err)
    }
}