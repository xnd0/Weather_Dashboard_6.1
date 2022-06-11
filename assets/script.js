// ---------------------- //
// ----- Javascript ----- //
// ---------------------- //


var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1d148820fae7548eecd9ed98012efbde";

fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log('Fetch Response \n-------------');
        console.log(data.city);
    });