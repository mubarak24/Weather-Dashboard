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

  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInput.value + '&units=imperial&appid=26f261122333e7edeba0c7e85805e21e')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    forecastContainer.innerHTML = "";

    // create elements to display forecast
    var forecastTitleEl = document.createElement("h2");
    forecastTitleEl.textContent = "5-Day Forecast:";
    forecastContainer.appendChild(forecastTitleEl);

    var forecastRowEl = document.createElement("div");
    forecastRowEl.classList.add("row");

    // loop through forecast data for next 5 days
    for (var i = 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
        var forecastColEl = document.createElement("div");
        forecastColEl.classList.add("col-md-2");

        var forecastCardEl = document.createElement("div");
        forecastCardEl.classList.add("card", "bg-primary", "text-white");

        var forecastCardBodyEl = document.createElement("div");
        forecastCardBodyEl.classList.add("card-body", "p-2");

        var forecastDateEl = document.createElement("p");
        forecastDateEl.classList.add("card-text");
        forecastDateEl.textContent = new Date(data.list[i].dt_txt).toLocaleDateString();
        forecastCardBodyEl.appendChild(forecastDateEl);

        var forecastIconEl = document.createElement("img");
        forecastIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
        forecastIconEl.setAttribute("alt", data.list[i].weather[0].description);
        forecastCardBodyEl.appendChild(forecastIconEl);

        var forecastTempEl = document.createElement("p");
        forecastTempEl.classList.add("card-text");
        forecastTempEl.textContent = "Temp: " + data.list[i].main.temp_max + " °F";
        forecastCardBodyEl.appendChild(forecastTempEl);

        var forecastHumidityEl = document.createElement("p");
        forecastHumidityEl.classList.add("card-text");
        forecastHumidityEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";
        forecastCardBodyEl.appendChild(forecastHumidityEl);

        forecastColEl.appendChild(forecastCardEl);
        forecastCardEl.appendChild(forecastCardBodyEl);
        forecastRowEl.appendChild(forecastColEl);
      }
    }

    forecastContainer.appendChild(forecastRowEl);
  });

});