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
//  let day = days[day1]
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
//function formatDate(date) {
  //let hours = date.getHours();
 // if (hours < 10) {
 //   hours = `0${hours}`;
//  }
 // let minutes = date.getMinutes();
//  if (minutes < 10) {
//    minutes = `0${minutes}`;
//  }
//  let dayIndex = date.getDay();
//  let days = [
  //  "Sunday",
  //  "Monday",
  //  "Tuesday",
  //  "Wednesday",
  //  "Thursday",
  //  "Friday",
  //  "Saturday"
//  ];
//  let day = days[dayIndex];
//  return `${day} ${hours}:${minutes}`;
//}
//function displayWeatherCondition(response) {
  //document.querySelector("#city").innerHTML = response.data.name;
//  document.querySelector("#temperature").innerHTML = Math.round(
  //  response.data.main.temp
 // );
//  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
//  document.querySelector("#wind").innerHTML = Math.round(
 //   response.data.wind.speed
 // );
 // document.querySelector("#description").innerHTML =
 //   response.data.weather[0].main;
//}
//function searchCity(city) {
  //let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 // axios.get(apiUrl).then(displayWeatherCondition);
//}
//function handleSubmit(event) {
  //event.preventDefault();
  //let city = document.querySelector("#city-input").value;
  //searchCity(city);
//}
//let dateElement = document.querySelector("#date");
//let currentTime = new Date();
//dateElement.innerHTML = formatDate(currentTime);
//let searchForm = document.querySelector("#search-form");
//searchForm.addEventListener("submit", handleSubmit);
//searchCity("New York");

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");