searchButtonEl = document.querySelector(".searchBtn");

const searchCity = (cityName) =>{
    cityName.preventDefault();
    let city = document.getElementById("user-input").value;
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=";
    var apiKey = "&units=imperial&appid=55494ace23520784606e14e197b5fad1";
    var apiFetch = weatherApi + city + apiKey;
        fetch(apiFetch)
        .then(response => response.json())
        .then(data => {
            const tempValue = data.main.temp
            const humid = data.main.humidity
            const windValue = data.wind.speed
            console.log(tempValue);
            console.log(humid);
            console.log(windValue);
        })
}

document.getElementById("searchBtn").addEventListener("click", searchCity);
