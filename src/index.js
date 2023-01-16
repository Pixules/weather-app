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
  document.querySelector("#current-location").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  document.querySelector("#current-temp").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#current-conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#feels").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document
    .querySelector("#current-weather")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function searchCity(city) {
  let apiKey = "dccecb8a351b66f3478d27fa5f987685";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

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
  let apiKey = "dccecb8a351b66f3478d27fa5f987685";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(clickedLocation);
}

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
