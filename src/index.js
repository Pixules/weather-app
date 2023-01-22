function updateTime() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = document.querySelector("#current-time");
  return (currentTime.innerHTML = `${hours}:${minutes}`);
}

function updateDate() {
  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let currentDay = document.querySelector("#week-day");
  return (currentDay.innerHTML = `${day}`);
}

updateTime();
updateDate();

function showWeatherConditions(response) {
  document.querySelector("#current-location").innerHTML = response.data.city;

  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#current-temp").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#current-conditions").innerHTML =
    response.data.condition.description;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humid").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#feels").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#pressure").innerHTML =
    response.data.temperature.pressure;
  let weatherIcon = document.querySelector("#current-weather");
  let iconURL = response.data.condition.icon_url;
  weatherIcon.innerHTML = `<img src=${iconURL}>`;
}

function searchCity(city) {
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeatherConditions);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function clickedLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(clickedLocation);
}

const apiKey = "b2d93ce3a9a20cf40a803744bbt2da8o";

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", search);

let current = document.querySelector("#current-location-button");
current.addEventListener("click", getCurrentLocation);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusClick.classList.remove("active");
  fahrenheitClick.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusClick.classList.add("active");
  fahrenheitClick.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitClick = document.querySelector("#fahrenheit");
fahrenheitClick.addEventListener("click", showFahrenheitTemp);

let celsiusClick = document.querySelector("#celsius");
celsiusClick.addEventListener("click", showCelsiusTemp);

searchCity("Liverpool");
