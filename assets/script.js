// ---------------------- //
// ----- Javascript ----- //
// ---------------------- //

var searchCityButton = document.querySelector('#searchCityButton');
var cityInput = document.querySelector('#searchCity');
var cityResult = document.getElementById('citySearchResult');


var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1d148820fae7548eecd9ed98012efbde";

// var requestCityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&limit=5&appid=1d148820fae7548eecd9ed98012efbde";

// var requestCityUrl ="";

function showResponse(event) {
    // Prevent default action
    event.preventDefault();

    console.log('searchCity is:' + cityInput.value);
    cityResult.textContent = cityInput.value;

    requestCityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&limit=5&appid=1d148820fae7548eecd9ed98012efbde";

    fetch(requestCityUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log('Fetch Response CITY GEOCODE \n-------------');
        console.log(data);
    });

  }




fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log('Fetch Response \n-------------');
        console.log(data.city);
    });


searchCityButton.addEventListener("click", showResponse);

