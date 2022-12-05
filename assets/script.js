var weatherURL = 'https://api.openweathermap.org';
var weatherApiKey = '46903eec69982e0c4ee70b0657d599cb'

var nameOnPage = document.getElementById('weatherLocation');
var tempOnPage = document.getElementById('weatherTemp')
var humidOnPage = document.getElementById('weatherHumid')
var windOnPage = document.getElementById('weatherWindSpeed')

var inputLatitude = "";
var inputLongitude = "";
var inputLocation = "San Diego";
var zipCode = "92606"
var countryCode = "US"

var outputTemperature
var outputHumidity
var outputWind

var coordSearch = `${weatherURL}/geo/1.0/direct?q=${inputLocation}&limit=5&appid=${weatherApiKey}&units=imperial`

var coordSearchZIP = `${weatherURL}/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${weatherApiKey}&units=imperial`




function getCoordinates() {
  fetch(coordSearchZIP)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      inputLatitude = data.lat;
      inputLongitude = data.lon;
    })
    .then(function () {
      console.log(inputLatitude);
      console.log(inputLongitude);
      getWeather();
    })
}

function getWeather() {
  fetch(`${weatherURL}/data/2.5/weather?lat=${inputLatitude}&lon=${inputLongitude}&appid=${weatherApiKey}&units=imperial`)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data);
      outputTemperature = data.main.temp;
      outputHumidity = data.main.humidity;
      outputWind = data.wind.speed
      inputLocation = data.name
      nameOnPage.innerText = inputLocation;
      tempOnPage.innerText = `Temp: ${Math.floor(outputTemperature)}F`;
      windOnPage.innerText = `Wind Speed: ${outputWind}MPH`;
      humidOnPage.innerText = `Humidity: ${outputHumidity}%`;
    })
}


getCoordinates();

// // btn to save city in li
// // --> btn also saves in local storage
// // --> li also sends saved data to api to pull same place
// // btn to send request to api

// // convert city name into coordinates
// // unhide elements on page