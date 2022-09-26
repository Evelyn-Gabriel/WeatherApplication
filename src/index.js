//let weather = {
// paris: {
// temp: 19.7,
// humidity: 80
// },
// tokyo: {
//  temp: 17.3,
//  humidity: 50
// },
// lisbon: {
//   temp: 30.2,
//   humidity: 20
// },
// "san francisco": {
//   temp: 20.9,
//  humidity: 100
// },
// moscow: {
//   temp: -5,
//   humidity: 20
// }
//};

//let city = prompt("Enter a city?");
//city = city.toLowerCase();
//city = city.trim();

//if (weather[city] !== undefined) {
// var temperature = weather[city].temp;
// var humidity = weather[city].humidity;
//var celsiusTemperature = Math.round(temperature);
//var fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
//alert(
//  "It is currently " +
//    celsiusTemperature +
//   "°C (" +
//   fahrenheitTemperature +
//   "°F) in " +
//   city +
//   " with a humidity of " +
//   humidity +
//   "%"
//);
//} else {
// alert(
//   "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
//     city
// );
//}//

//function date1(date) {
// let hours = date.getHours();
// if (hours < 10) {
//   hours = `0${hours}`;
// }
// let minutes = date.getMinutes();
// if (minutes < 10) {
//   minutes = `0${minutes}`;
// }

//let day1 = date.getDay();
// let days = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday"
//  ];
//  let day = days[day1];

// return `${day} ${hours}:${minutes}`;
//}

//function search(event) {
// event.preventDefault();
// var cityElement = document.querySelector("#city");
// var cityInput = document.querySelector("#city-input");
// cityElement.innerHTML = cityInput.value;
//}

//function convertFahrenheit(event) {
//  event.preventDefault();
//  let temperature = document.querySelector("#temperature");
//  temperature.innerHTML = 66;
//}

//function convertCelsius(event) {
// event.preventDefault();
// let temperature = document.querySelector("#temperature");
// temperature.innerHTML = 19;
//}

//let date = document.querySelector("#date");
//let time = new Date();
//date.innerHTML = date1(time);

//let searchForm = document.querySelector("#search-form");
//searchForm.addEventListener("submit", search);

//let fahrenheit2 = document.querySelector("#fahrenheit-link");
//fahrenheit2.addEventListener("click", convertFahrenheit);

//let celsius2 = document.querySelector("#celsius-link");
//celsius2.addEventListener("click", convertCelsius);

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}




let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


searchCity("New York");
