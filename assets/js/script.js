// Global variables
var temp = document.querySelector(".temp");
var cityNameDate = document.querySelector(".cityNameDate")
var currentDate = moment().format("dddd, MM/DD/YY");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var uvIndex = document.querySelector(".uv-index");
var fiveDayForecast = document.querySelector(".fiveDays");
var userInputEl = document.querySelector(".user-input");
searchButtonEl = document.querySelector(".searchBtn");
var recentButtonEl = document.querySelector(".recentBtn");
var SearchedCitiesEl = document.querySelector(".searched-cities");

document.querySelector(".fiveDayHeading").style.visibility = "hidden";
document.querySelector(".current-weather").style.visibility = "hidden";


// let saveCities = [];
// // let cities = JSON.parse(localStorage.getitem(cities));
// let cities = JSON.parse(localStorage.getItem("cities")) || [];
// console.log(cities);
// function initSearchSection () {
//     console.log("initSearchSection");
//     var storedCities = localStorage.getItem("cities");
//     if (storedCities) {
//         cities = JSON.parse(storedCities);                                           ONCE I UNCOMMENT THIS THE PREVIOUSLY SEARCHED CITIES DONT WORK ANYMORE
//     }
//     SearchedCitiesEl.innerHTML = "";
//     for (var i = cities.length - 1; i >= 0; i--) {
//         const button = document.createElement("button");
//         button.setAttribute("class", "recentBtn btn-primary btn m-1")
//         button.setAttribute("value", cities[i])
//         document.querySelector(".searched-cities").appendChild(button);
//         button.textContent = cities[i];
       
//         button.addEventListener("click", (e)=> {
//             var btn = e.target
//             //  console.log("Clicked " + cityName)
//              var cityName = btn.getAttribute("value");
//              console.log(cityName);
//             searchCity(cityName)
//         }); 
//     }
// }
// initSearchSection();

// Function that searches weather for a city based on user input
function searchCity(cityName){
  
    // if (cities.indexOf(cityName) !== -1) {                                    ONCE I UNCOMMENT THIS THE PREVIOUSLY SEARCHED CITIES DONT WORK ANYMORE
    //     return;
    // } 

    // cities.push(cityName);
    // localStorage.setItem("cities", JSON.stringify(cities));

    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=";
    var apiKey = "&units=metric&appid=55494ace23520784606e14e197b5fad1";
    var apiFetch = weatherApi + cityName + apiKey;
    // console.warn("Apifetch", apiFetch)
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

                // Assigns a color around the uvi test depending on the uvi reading.
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

                // Displays the 5 day forecast for a city.
                var fiveDayStats = data.daily
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
                    
                    // Creates a card for each day in the 5 day forecast
                    fiveDay += `<div class="card alert-primary m-1 p-2" style="flex: 1">
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
   
    document.querySelector(".fiveDayHeading").style.visibility = "visible";
    document.querySelector(".current-weather").style.visibility = "visible";  
};


document.getElementById("searchBtn").addEventListener("click", ()=>{
    let cityName = document.getElementById("user-input").value;
    searchCity(cityName)});


// Creates a button for a city that is searched
const recentSearches = () => {
    const button = document.createElement("button");
    button.setAttribute("class", "recentBtn btn-primary btn m-1")
    button.setAttribute("value", userInputEl.value)
    document.querySelector(".searched-cities").appendChild(button);
    button.textContent = userInputEl.value
   
    button.addEventListener("click", (e)=> {
        var btn = e.target
        //  console.log("Clicked " + cityName)
         var cityName = btn.getAttribute("value");
         console.log(cityName);
        searchCity(cityName)
    }); 
}

document.getElementById("searchBtn").addEventListener("click", recentSearches)

