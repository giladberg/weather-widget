const cityNotFound = document.getElementById('city-not-found');
const loadingState = document.getElementById('loading-state');
const weatherContainer = document.getElementById('weather-container');
function getInput() {
  let city = document.getElementById('user-input').value;
  if (city == '') {
  } else {
    getWeather(city);
  }
}

function getWeather(city) {
  loadingState.style.display = 'block';
  weatherContainer.style.display = 'none';
  cityNotFound.style.display = 'none';
  httpGetAsync(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`,
    res => {
      if (JSON.parse(res).message == 'city not found') {
        loadingState.style.display = 'none';
        weatherContainer.style.display = 'none';
        notFoundMessage();
      } else {
        let outcome = JSON.parse(res);
        let name = document.getElementById('city-name');
        let temp = document.getElementById('temp');
        let windSpeed = document.getElementById('wind-speed');
        let overcast = document.getElementById('overcast');
        name.innerHTML = outcome.name;
        temp.innerHTML = outcome.main.temp.toFixed(0);
        windSpeed.innerHTML = outcome.wind.speed;
        overcast.innerHTML = outcome.weather[0].description;
        loadingState.style.display = 'none';
        weatherContainer.style.display = 'block';
      }
    }
  );
}

function httpGetAsync(theUrl, callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      callback(xmlHttp.responseText);
    }
    if (xmlHttp.readyState == 4 && xmlHttp.status == 404) {
      callback(xmlHttp.responseText);
    }
  };

  xmlHttp.open('GET', theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}
function notFoundMessage() {
  cityNotFound.style.display = 'block';
  setTimeout(() => {
    cityNotFound.style.display = 'none';
  }, 3000);
}
