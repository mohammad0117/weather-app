import { getWeekDay } from "./utils/customDate.js";
import getWeatherData from "./utils/httpReq.js";
import { removeModal, showModal } from "./utils/modal.js";
const searchInput = document.querySelector("input");
const searchbutton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");
const modalButton = document.getElementById("modal-button");
const loader = document.getElementById("loader");

const renderCurrentWeather = (data) => {
  if (!data) return;
  const weatherJSX = `
    <h1>${data.city.name},${data.city.country}</h1>
    <div id="main">
    <img alt="weather-icon" src="https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png" />
    <span>${data.list[0].weather[0].main}</span>
    <p>${Math.round(data.list[0].main.temp)}c°</p>
    </div>
    <div id="info">
    <p>humidity:<span>${data.list[0].main.humidity}</span>%</p>
    <p>wind speed:<span>${data.list[0].wind.speed}m/s</span></p>
    </div>
`;
  weatherContainer.innerHTML = weatherJSX;
};
const renderForecastWeather = (data) => {
  if (!data) return;
  forecastContainer.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const forecastJSX = `
    <div>
    <img alt="weather-icon" src="https://openweathermap.org/img/w/${i.weather[0].icon}.png" />
    <h3>${getWeekDay(i.dt)}</h3>
    <p>${Math.round(i.main.temp)}c°</p>
    <span>${i.weather[0].main}</span>
    </div>
    `;
    forecastContainer.innerHTML += forecastJSX;
  });
};
const searchHandler = async () => {
  const cityName = searchInput.value;

  if (!cityName) {
    showModal("please enter city name!");
    return;
  }

  const currentData = await getWeatherData("current", cityName);
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", cityName);
  renderForecastWeather(forecastData);
};
const positionCallBack = async (position) => {
  const currentData = await getWeatherData("current", position.coords);
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", position.coords);
  renderForecastWeather(forecastData);
};
const errorCallBack = (error) => {
  showModal(error.message);
};
const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallBack, errorCallBack);
  } else {
    showModal("your broser dosnot support geolocation");
  }
};
const initHandler = async () => {
  const currentData = await getWeatherData("current", "nahavand");
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", "nahavand");
  renderForecastWeather(forecastData);
};
searchbutton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
modalButton.addEventListener("click", removeModal);
document.addEventListener("DOMContentLoaded", initHandler);
