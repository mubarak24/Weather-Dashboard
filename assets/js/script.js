var clickBtn = document.getElementById("click");
var searchInput = document.getElementById("search");
var currentWeatherContainer = document.getElementById("current-weather");
var forecastContainer = document.getElementById("forecast");
var searchHistory = document.getElementById("search-history");

var searchHistoryData = [];
if (localStorage.getItem("searchHistoryData")) {
  searchHistoryData = JSON.parse(localStorage.getItem("searchHistoryData"));
}

clickBtn.addEventListener("click", function () {
  var city = searchInput.value.trim();

  // CURRENT WEATHER
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchInput.value + '&units=imperial&appid=26f261122333e7edeba0c7e85805e21e')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var cityName = data.name;
      var currentDate = new Date();
      var iconCode = data.weather[0].icon;
      var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
      var temperature = data.main.temp;
      var humidity = data.main.humidity;
      var windSpeed = data.wind.speed;

      var currentWeatherEl = document.createElement("div");
      currentWeatherEl.classList.add("current-weather");

      var cityEl = document.createElement("h2");
      cityEl.textContent = `${cityName} (${currentDate})`;
      currentWeatherEl.appendChild(cityEl);
      
      var iconEl = document.createElement("img");
      iconEl.setAttribute("src", iconUrl);
      iconEl.setAttribute("alt", data.weather[0].description);
      currentWeatherEl.appendChild(iconEl);
      
      var tempEl = document.createElement("p");
      tempEl.innerHTML = `Temperature: ${temperature}&deg;F`;
      currentWeatherEl.appendChild(tempEl);
      
      var windEl = document.createElement("p");
      windEl.textContent = `Wind Speed: ${windSpeed} MPH`;
      currentWeatherEl.appendChild(windEl);
      
      var humidityEl = document.createElement("p");
      humidityEl.textContent = `Humidity: ${humidity}%`;
      currentWeatherEl.appendChild(humidityEl);
      
      // Append current weather to container
      currentWeatherContainer.innerHTML = "";
      currentWeatherContainer.appendChild(currentWeatherEl);
    })
    
    searchHistoryData.push(city);
    localStorage.setItem("searchHistoryData", JSON.stringify(searchHistoryData));
    searchHistory.innerHTML = "";
  
    searchHistoryData.forEach(function (city) {
      var li = document.createElement("li");
      li.textContent = city;
      searchHistory.appendChild(li);
    });
    
    // FORECAST
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInput.value + '&units=imperial&appid=26f261122333e7edeba0c7e85805e21e')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
});