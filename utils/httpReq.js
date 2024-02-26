import { showModal } from "./modal.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "3659cfc3899371d8fc4967df8b762e70";

const getWeatherData = async (type, data) => {
  let url = null;
  switch (type) {
    case "current":
      if (typeof data === "string") {
        url = url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&units=metric`;
      }
    case "forecast":
      if (typeof data === "string") {
        url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&units=metric`;
      }
      break;

    default:
      url = `${BASE_URL}/weather?q=nahavand&appid=${API_KEY}&units=metric`;
      break;
  }
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (+json.cod === 200) {
      
      return json;
    }else{
      showModal(json.message)
    }
  } catch (error) {
  }
};
export default getWeatherData;

