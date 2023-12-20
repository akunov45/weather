const BASE_URL = "https://api.openweathermap.org"
const api = {
  weather: "/data/2.5/weather?q="
}
const api_key = "&appid=6511e14723ad8cb6f243ece1366c5deb";
// DOM
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const weatherStatus = document.getElementById("weatherStatus");
const btnShow = document.getElementById("btnShow");
const textField = document.getElementById("textField");
const weatherImg = document.getElementById("weatherImg");
const spinner = document.getElementById("spinner");

async function getWeather(name = "Bishkek") {
  try {
    spinner.style.display = "block"
    const url = BASE_URL + api.weather + name + api_key
    textField.value = ""
    const { data } = await axios(url)
    spinner.style.display = "none"
    renderWeather(data)
    console.log(data);
  } catch (error) {
    spinner.style.display = "none"
    const { message } = error.response.data
    alert(message)
  }
}
getWeather()

btnShow.onclick = () => {
  if (!textField.value.trim()) return;
  getWeather(textField.value)
}
textField.addEventListener("keydown", ({ key }) => {
  if (key === "Enter" && textField.value.trim()) getWeather(textField.value)
})

function renderWeather({ name, sys, main, weather }) {
  const { text, img } = setStatusText(weather[0].main)
  cityName.innerHTML = `${name} <span>${sys.country}</span>`
  temp.innerHTML = `${(main.temp - 273.15).toFixed()} <span>°c</span>`
  weatherStatus.innerHTML = text
  weatherImg.src = img
}

function setStatusText(status) {
  switch (status) {
    case "Clouds":
      return {
        img: "/assets/clouds.png",
        text: "Облачно"
      };
    case "Clear":
      return {
        img: "/assets/sunny.png",
        text: "Ясно"
      };
    case "Snow":
      return {
        img: "/assets/snow.png",
        text: "Снег"
      };
    case "Smoke":
    case "Fog":
    case "Mist":
      return {
        img: "/assets/smoke.png",
        text: "Туман"
      };
    default: return "New Status"
  }
}