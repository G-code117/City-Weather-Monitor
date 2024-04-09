let WeatherHistory = [];
const WeatherApi = "https://api.openweathermap.org";
const WeatherApiKey = "";//add api key later;

const searchForm = document.querySelector("#search")
const searchInput = document.querySelector("#p-1")
const todayContainer = document.querySelector("#")
const forecastContainer = document.querySelector("#")
const weatherHistoryContainer = document.querySelector("#")

function fetchWeather(coordinates){

}
function makeSearchHistory(){
    weatherHistoryContainer.innerHTML ="";
    for(let i=0; i<WeatherHistory.length; i++){
        const button =document.createElement("button");
        button.setAttribute("type","button");
        button.setAttribute("class","btn btn-secondary");
        button.setAttribute("aria-controls","todays forecast");
        button.classList.add("history");
        button.setAttribute("data-search",WeatherHistory[i]);
        button.textContent = WeatherHistory[i];
        WeatherHistory.append(button);
    }
}

function appendWeatherHistory(search){
    if(WeatherHistory.indexOf(search === -1)){
        return;
    }
    WeatherHistory.push(search);
    localStorage.setItem("weatherHistory", JSON.stringify(WeatherHistory));
    makeSearchHistory();
}

function fetchCoordinates(search){
    const url =`${WeatherApi}/geo/1.0/direct?q=${search}&appid=${WeatherApi}`
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        const longitude = data[0].lat;
        const latitude = data[0].lon;
        console.log(data, latitude, longitude);
        if(!data[0]){
            alert("city not found");
        }
        else{
            console.log(data);
            appendWeatherHistory(search);
            fetchWeather(data[0])
        }
    })
    .catch(function(error){
        console.log(error);
    });
}

function handleSearchForm(event){
    event.preventDefault();
    
    const search = searchInput.ariaValueMax.trim();
    if(search){
        fetchCoordinates(search);
    }
    searchInput.value ="";
}


searchForm.addEventListener("submit", handleSearchForm);