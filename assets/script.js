// ---------------------- //
// ----- Javascript ----- //
// ---------------------- //

var searchCityButton = document.querySelector('#searchCityButton');
var cityInput = document.querySelector('#searchCity');

var cityResult = document.getElementById('citySearchResult'); // city input
var tempResult = document.getElementById('tempSearchResult'); //temp
var windResult = document.getElementById('windSearchResult'); //wind
var humidityResult = document.getElementById('humiditySearchResult'); //humidity
var uvResult = document.getElementById('uvSearchResult'); //uv%

var cityHistoryEl = document.getElementById('cityHistory');


var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1d148820fae7548eecd9ed98012efbde";


let currentDate = moment().format("M/D/YYYY");
console.log(currentDate);


let citySearchArray = [];
let storedCity = [];


// --- Functions Section --- //

function saveCity() {
    console.log('testttt');

    let storedCity = JSON.parse(localStorage.getItem("cityList"));
	if (storedCity !== null) {
		citySearchArray = storedCity;
	};
	citySearchArray.push(cityInput.value);
	localStorage.setItem("cityList", JSON.stringify(citySearchArray));

    displaySaved();

    // cityHistoryEl.textContent = cityInput.value;

} 

function displaySaved() {
	let storedCity = JSON.parse(localStorage.getItem("cityList"))
	for (let i = 0; i < storedCity.length; i++) {
        const historyEl = document.createElement("button");
        historyEl.textContent = storedCity[i];
        cityHistoryEl.appendChild(historyEl); 
    }
};

displaySaved();

function showResponse(event) {
    // Prevent default action
    event.preventDefault();

    console.log('searchCity is:' + cityInput.value);
    cityResult.textContent = cityInput.value + '  (' + currentDate + ')';

    saveCity();

    requestCityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&limit=5&appid=1d148820fae7548eecd9ed98012efbde";

    fetch(requestCityUrl)
        .then(data => data.json())
        .then(
            data => {
                console.log(data);
                console.log("test");
                console.log(data[0].lat);
                console.log(data[0].lon);

                let searchLat = data[0].lat;
                let searchLon = data[0].lon;

                searchUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchLat}&lon=${searchLon}&units=imperial&exclude=minutely,hourly&appid=1d148820fae7548eecd9ed98012efbde`;

                console.log('searchUrl is: ' + searchUrl)

                // --- fetch from searchUrl --- //

                fetch(searchUrl)
                    .then(response => response.json())
                    .then(
                        response => {
                            console.log(response);

                            console.log('temp is: ' + response.current.temp);
                            console.log('wind is: ' + response.current.wind_speed);
                            console.log('humidity is: ' + response.current.humidity);
                            console.log('uvi is: ' + response.current.uvi);

                            tempResult.textContent = 'Temperature: ' + response.current.temp + '°F';
                            windResult.textContent = 'Wind: ' + response.current.wind_speed + ' MPH';
                            humidityResult.textContent = 'Humidity: ' + response.current.humidity + '%';
                            uvResult.textContent = 'UV Index: ' + response.current.uvi;

                            const uvIndex = response.current.uvi;

                            if (uvIndex <= 3) {
                                uvResult.setAttribute("style", "background-color: green;");
                            } else if (uvIndex > 3 && uvIndex <= 6) {
                                uvResult.setAttribute("style", "background-color: yellow;");
                            } else if (uvIndex > 6 && uvIndex <= 8) {
                                uvResult.setAttribute("style", "background-color: orange;");
                            } else if (uvIndex > 8 && uvIndex <= 11) {
                                uvResult.setAttribute("style", "background-color: red;");
                            } else {
                                uvResult.setAttribute("style", "background-color: purple;");
                            }
                        }
                    )
            }).catch(err => console.error(err));
}




searchCityButton.addEventListener("click", showResponse);

