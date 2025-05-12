import axios from "axios";

export default async function updateCurrencyRateService(rate){
    try {
      const {data} = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/currencyRate/update`,
        { currentInr: rate.get("currentInr") }
      )
      return data
    } catch (err) {
        console.log(err)
    }
}