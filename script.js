const apiKey = "9bde900ef746991b72a58dff4054f05b";
let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");
let weatherInfo = document.getElementById("weatherInfo");
let logBox = document.getElementById("logBox");
let historyDiv = document.getElementById("history");


function logMessage(text) {
    let p = document.createElement("p");
    p.innerText = "> " + text;
    logBox.appendChild(p);
}


searchBtn.addEventListener("click", function () {
    let city = cityInput.value;
    if (city == "") {
        alert("Please enter city name");
        return;
    }

    getWeather(city);
});


async function getWeather(city) {
    logBox.innerHTML = "";
    logMessage("Searching weather for " + city);
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
    try {
        let response = await fetch(url);
        let data = await response.json();
        if (data.cod == 200) {
            showWeather(data);
            saveHistory(city);
            logMessage("Weather loaded successfully");
        } else {
            logMessage("City not found");
        }

    }

    catch (error) {
        logMessage("Something went wrong");

    }

}


function showWeather(data) {
    weatherInfo.innerHTML =
        "<p>City : " + data.name + "</p>" +
        "<p>Temperature : " + data.main.temp + " °C</p>" +
        "<p>Weather : " + data.weather[0].main + "</p>" +
        "<p>Humidity : " + data.main.humidity + "%</p>" +
        "<p>Wind : " + data.wind.speed + " m/s</p>";

}


function saveHistory(city) {
    let old = localStorage.getItem("cities");
    let cities = [];
    if (old) {
        cities = JSON.parse(old);
    }

    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
    }
    showHistory();

}


function showHistory() {
    historyDiv.innerHTML = "";
    let old = localStorage.getItem("cities");
    if (old) {
        let cities = JSON.parse(old);
        for (let i = 0; i < cities.length; i++) {
            let span = document.createElement("span");
            span.innerText = cities[i];
            span.onclick = function () {
                getWeather(cities[i]);
            };
            historyDiv.appendChild(span);
        }
    }
}

showHistory();