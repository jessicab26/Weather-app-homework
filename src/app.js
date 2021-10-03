let date = new Date();
let h3 = document.querySelector("h3.day");
let h4 = document.querySelector("h4.month");
let h5 = document.querySelector("h5");
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = "0${minutes}";
}

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[date.getMonth()];
let number = date.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];

h3.innerHTML = day;
h4.innerHTML = month + " " + number;
h5.innerHTML = hours + " " + minutes;

function displayWeatherCondition(response) {
  let icon = document.querySelector("#icon");
  fahrenheitTemp = response.data.main.temp;
  document.querySelector("#city-location").innerHTML = response.data.name;
  document.querySelector("#new-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#downpour").innerHTML =
    Math.round(response.data.main.feels_like) + "℉";
  document.querySelector("#sweat").innerHTML =
    Math.round(response.data.main.humidity) + "%";
  document.querySelector("#blow").innerHTML =
    Math.round(response.data.wind.speed) + "mph";
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#high").innerHTML =
    Math.round(response.data.main.temp_max) + "℉";
  document.querySelector("#low").innerHTML =
    Math.round(response.data.main.temp_min) + "℉";
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "dd7b4743f092d8d584d793818a1a33ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#submit-city").value;
  searchCity(city);
}

let form = document.querySelector("#search-new-city");
form.addEventListener("submit", handleSubmit);

function research(event) {
  event.preventDefault();
  let researchInput = document.querySelector("#submit-city");

  let p = document.querySelector("p");
  p.innerHTML = `Now showing weather for....`;
}
let dorm = document.querySelector("#search-new-city");
dorm.addEventListener("submit", research);

function newCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#new-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusClick = ((fahrenheitTemp - 32) * 5) / 9;
  temperature.innerHTML = Math.round(celsiusClick);
}

function oldFahrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#new-temp");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", newCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", oldFahrenheitTemp);

function searchLocation(position) {
  let apiKey = "dd7b4743f092d8d584d793818a1a33ef";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  let researchInput = document.querySelector("#submit-city");

  let p = document.querySelector("p");
  p.innerHTML = `Currently in....`;
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-area");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New Orleans");
