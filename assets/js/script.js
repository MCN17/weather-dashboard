searchButtonEl = document.querySelector(".searchBtn");

var temp = document.querySelector(".temp");
var cityNameDate = document.querySelector(".cityNameDate")
var currentDate = moment().format("dddd, MM/DD/YY");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var uvIndex = document.querySelector(".uv-index");

const searchCity = (cityName) =>{
    cityName.preventDefault();
    let city = document.getElementById("user-input").value;
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=";
    var apiKey = "&units=metric&appid=55494ace23520784606e14e197b5fad1";
    var apiFetch = weatherApi + city + apiKey;
        fetch(apiFetch)
        .then(response => response.json())
        .then(data => {
            const name = data.name
            const tempValue = data.main.temp
            const humidityValue = data.main.humidity
            const windValue = data.wind.speed
            console.log(currentDate);
            console.log(name);
            console.log(tempValue);
            console.log(humidityValue);
            console.log(windValue);
            // console.log(lon);
            // console.log(lat);

            cityNameDate.innerHTML = "";
            cityNameDate.innerHTML = `${name} (${currentDate})`;
            temp.innerHTML = `Temp: ${tempValue}&#176C`;
            wind.innerHTML = `Wind: ${windValue} km/h`;
            humidity.innerHTML = `Humidity: ${humidityValue}%`;
            // uvIndex.innerHTML = `UV Index: ${uvIndexValue}`;

        })
}

document.getElementById("searchBtn").addEventListener("click", searchCity);




