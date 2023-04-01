
var clickBtn = document.getElementById("click");
var searchInput = document.getElementById("search");

clickBtn.addEventListener("click", function() {
    // grab the value from the input and console log it
    console.log(searchInput.value);
    // CURRENT WEATHER
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ searchInput.value  +'&units=imperial&appid=26f261122333e7edeba0c7e85805e21e')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });

    //   FORECAST
      fetch('https://api.openweathermap.org/data/2.5/forecast?q='+ searchInput.value  +'&units=imperial&appid=26f261122333e7edeba0c7e85805e21e')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
    
// // create the element
// var h1 = document.createElement("h1")
// // add the text content
// h1.textContent = "cities"
// // append to the container
// testContainer.append(h1)
});