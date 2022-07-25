searchButtonEl = document.querySelector(".searchBtn");

var temp = document.querySelector(".temp");
var cityNameDate = document.querySelector(".cityNameDate")
var currentDate = moment().format("dddd, MM/DD/YY");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var uvIndex = document.querySelector(".uv-index");
var fiveDayForecast = document.querySelector(".fiveDays");
var userInputEl = document.querySelector(".user-input");
var recentButtonEl = document.querySelector(".recentBtn");
var SearchedCitiesEl = document.querySelector(".searched-cities");

const searchCity = (cityName) =>{
    console.log(cityName)    // Only the first recentBtn that is created actually searches anything...must have something to do with me making all the buttons have the same id.
    cityName.preventDefault();
    let city = document.getElementById("user-input").value;
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=";
    var apiKey = "&units=metric&appid=55494ace23520784606e14e197b5fad1";
    var apiFetch = weatherApi + city + apiKey;
        fetch(apiFetch)
        .then(response => response.json())
        .then(data => {
            const name = data.name
            const tempValue = Math.round(data.main.temp)
            const humidityValue = data.main.humidity
            const windValue = parseInt(data.wind.speed * 3.6);
            var icon = data.weather[0].icon                                    // using var I can declare icon twice
            const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
            var icon = `<img src="${iconUrl}"/>`;                               // using var I can declare icon twice
            // console.log(currentDate);
            // console.log(name);
            // console.log(tempValue);
            // console.log(humidityValue);
            // console.log(windValue);
            cityNameDate.innerHTML = "";
            cityNameDate.innerHTML = `${name} (${currentDate}) ${icon}`;
            temp.innerHTML = `Temp: ${tempValue}&#176C`;
            wind.innerHTML = `Wind: ${windValue} km/h`;
            humidity.innerHTML = `Humidity: ${humidityValue}%`;
            
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=metric&appid=55494ace23520784606e14e197b5fad1")
            .then(response => response.json()) 
            .then(data => {
                var uvi = data.daily[0].uvi;
                // console.log(uvi);
                uvIndex.innerHTML = `UVI: ${uvi}`

                if (uvi >= 8) {
                    uvIndex.classList.add("bg-danger");
                }

                if (uvi > 5 && uvi < 8) {
                    uvIndex.classList.add("bg-warning");            // Color doesn't change when you search another city that has a lower uvi than the last searched city.
                }                                                 // Color only changes if you search a city that has a higher uvi than the last city searched.

                if (uvi >= 3 && uvi <= 5) {
                    uvIndex.classList.add("bg-success");
                }

                if (uvi <= 2) {
                    uvIndex.classList.add("bg-primary");
                }

                

                // if (uvi < 2) {
                //     uvIndex.classList.add("bg-success");
                // } else if (uvi >= 3 && uvi <= 6) {
                //     uvIndex.classList.add("bg-warning");        // The color wont change from red back to green depending on the values. Only changes from green to red and then stays red no matter what the uvi value is.
                // } else {
                //     uvIndex.classList.add("bg-danger");
                // }

                var fiveDayStats = data.daily
                // console.log(fiveDayStats);

                var fiveDay = "";
                for (var i = 0; i < fiveDayStats.length; i++) {
                    if (i >= 5) break;
                    const newDate = moment().add(i, "d").format("M/D/YYYY")
                    const fiveDayData = fiveDayStats[i]
                    const tempStats = Math.round(fiveDayData.temp.day)
                    const windStats = parseInt(fiveDayData.wind_speed * 3.6);
                    const humidityStats = fiveDayData.humidity
                    var condIcon = fiveDayData.weather[0].icon
                    const iconUrl = `http://openweathermap.org/img/wn/${condIcon}.png`;
                    var condIcon = `<img src="${iconUrl}"/>`; 
                    // console.log(humidityStats);
                    // console.log(windStats);
                    // console.log(tempStats);
                    // console.log(condIcon);

                    fiveDay += `<div class="card alert-primary" style="flex: 1">
                        <p class="h6">${newDate}</p>
                        <img src="${iconUrl}"/>
                        <p class="h6">Temp: ${tempStats}&#176C</p>
                        <p class="h6">Wind: ${windStats}km/h</p>
                        <p class="h6">Humidity: ${humidityStats}%</p>
                    </div>`
                }    

                console.log(fiveDay);
                fiveDayForecast.innerHTML = fiveDay;
            });

        });
    saveData();

  
};

document.getElementById("searchBtn").addEventListener("click", searchCity);

const saveData = () => {
    var saveCity = document.querySelector(".user-input")
    localStorage.setItem("City", saveCity.value);
    
}

document.getElementById("searched-cities").innerHTML = localStorage.getItem("City");



const recentSearches = () => {
    const button = document.createElement("button");
    button.setAttribute("class", "recentBtn btn-primary btn m-1")
    button.setAttribute("id", "recentBtn")
    document.querySelector(".searched-cities").appendChild(button);
    button.textContent = userInputEl.value
    document.getElementById("recentBtn").addEventListener("click", searchCity);
}

document.getElementById("searchBtn").addEventListener("click", recentSearches)



