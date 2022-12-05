var weatherURL = 'https://api.openweathermap.org';
var weatherApiKey = '46903eec69982e0c4ee70b0657d599cb'



var latitude = "";
var longitude = "";
var inputLocation = "San Diego";
var zipCode = "92679"
var countryCode = "US"

var weatherSearch = `${weatherURL}/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`

var coordSearch = `${weatherURL}/geo/1.0/direct?q=${inputLocation}&limit=5&appid=${weatherApiKey}`

var coordSearchZIP = `${weatherURL}/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${weatherApiKey}`



function getWeather() {
  fetch(weatherSearch)
    .then(function (response))
}


function getCoordinates() {
  fetch(coordSearchZIP)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      latitude = data.lat;
      longitude = data.lon;
      getWeather();
    })
}


getCoordinates();

// // btn to save city in li
// // --> btn also saves in local storage
// // --> li also sends saved data to api to pull same place
// // btn to send request to api

// // convert city name into coordinates
// // unhide elements on page