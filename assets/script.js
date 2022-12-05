var weatherURL = "https://api.openweathermap.org";
var weatherApiKey = "46903eec69982e0c4ee70b0657d599cb";

var nameOnPage = document.getElementById("weatherLocation");
var tempOnPage = document.getElementById("weatherTemp");
var humidOnPage = document.getElementById("weatherHumid");
var windOnPage = document.getElementById("weatherWindSpeed");
var imgMainSrc = document.getElementById("weatherIconMain");
var todayDate = document.getElementById("todayDate");
var searchForm = document.querySelector("#searchForm");
var searchInput = document.querySelector("#searchInput");
var historySearch = document.querySelector(".dropdown-menu");

var localHistory = [];

var inputLatitude = "";
var inputLongitude = "";
var inputLocation = "San Diego";

var outputTemperature;
var outputHumidity;
var outputWind;
var outputURL = "";

function getCoordinates() {
  fetch(
    `${weatherURL}/geo/1.0/direct?q=${inputLocation}&limit=5&appid=${weatherApiKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      inputLatitude = data[0].lat;
      inputLongitude = data[0].lon;
      inputLocation = data[0].name;
    })
    .then(function () {
      getWeather();
    });
}

function getWeather() {
  fetch(
    `${weatherURL}/data/2.5/weather?lat=${inputLatitude}&lon=${inputLongitude}&appid=${weatherApiKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      outputTemperature = data.main.temp;
      outputHumidity = data.main.humidity;
      outputWind = data.wind.speed;
      outputURL = weatherURL + "/img/w/" + data.weather[0].icon + ".png";

      nameOnPage.innerText = inputLocation;
      tempOnPage.innerText = `Temp: ${Math.floor(outputTemperature)}F |`;
      windOnPage.innerText = `Wind Speed: ${outputWind}MPH |`;
      humidOnPage.innerText = `Humidity: ${outputHumidity}% |`;
      imgMainSrc.setAttribute("src", outputURL);
      todayDate.innerText = dayjs(data.sys.sunrise * 1000).format("M/D/YYYY");


      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputLocation}&appid=${weatherApiKey}&units=imperial`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          for (let i = 0; i < 5; i++) {
            document.querySelector(`#tempCard${i + 1}`).innerText = "Temp: " + Math.floor(data.list[i * 8].main.temp) + "F";
            document.querySelector(`#cardDate${i + 1}`).innerText = dayjs(data.list[i * 8].dt * 1000).format("M/D/YYYY")
            document.querySelector(`#weatherPic${i + 1}`).setAttribute("src", weatherURL + "/img/w/" + data.list[i * 8].weather[0].icon + ".png");
            document.querySelector(`#cardText${i + 1}`).innerText = data.list[i * 8].weather[0].description;
            document.querySelector(`#windCard${i + 1}`).innerText = "Wind Speed: " + data.list[i * 8].wind.speed + "MPH";
            document.querySelector(`#humidCard${i + 1}`).innerText = "Humidity: " + data.list[i * 8].main.humidity + "%";
          }
        })
    });

}

function historyClick(e) {
  if (!e.target.matches(".dropDownOption")) {
    return;
  } else {
    var btn = e.target;
    inputLocation = btn.innerText;
    getCoordinates();
  }
}

function formSubmit(e) {
  if (!searchInput.value) {
    return;
  }
  var dropDownTarget = document.querySelector(".dropdown-menu");
  var dropDownOption = document.querySelector(".dropDownOption");
  var dropDownCheck = document.getElementById(`${searchInput.value}`);
  if (!dropDownCheck) {
    var newLi = document.createElement("li");
    var newA = document.createElement("a");
    newA.setAttribute("class", "dropdown-item dropDownOption");
    newA.setAttribute("id", searchInput.value);
    newA.innerText = searchInput.value;
    newLi.append(newA);
    dropDownTarget.append(newLi);
    localHistory.push(searchInput.value);
    localStorage.setItem("previous-searches", JSON.stringify(localHistory));
  }
  e.preventDefault();
  inputLocation = searchInput.value;
  searchInput.value = "";
  getCoordinates();
}

function refreshPreviousSearches() {
  for (let i = 0; i < localHistory.length; i++) {
    var dropDownTarget = document.querySelector(".dropdown-menu");
    var dropDownOption = document.querySelector(".dropDownOption");
    var dropDownCheck = document.getElementById(`${searchInput.value}`);
    var newLi = document.createElement("li");
    var newA = document.createElement("a");
    newA.setAttribute("class", "dropdown-item dropDownOption");
    newA.setAttribute("id", localHistory[i]);
    newA.innerText = localHistory[i];
    newLi.append(newA);
    dropDownTarget.append(newLi);
  }
}

function checkSearchHistory() {
  var previousSearches = localStorage.getItem("previous-searches");
  if (previousSearches) {
    localHistory = JSON.parse(previousSearches);
  }
  refreshPreviousSearches();
}

checkSearchHistory();
searchForm.addEventListener("submit", formSubmit);
historySearch.addEventListener("click", historyClick);

// // btn to save city in li
// // --> btn also saves in local storage
// // --> li also sends saved data to api to pull same place
// // btn to send request to api

// // convert city name into coordinates
// // unhide elements on page
