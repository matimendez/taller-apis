// API key for OpenWeatherMap.
const apiKey = "0ed02ebd914efdcb7572bccf88da73cf";
// API URL with units in metric.
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=";

// DOM elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

// Function to check the weather for a given city.
async function checkWeather(city){
    // Send a GET request to the OpenWeatherMap API with provided city and API key.
    const response = await fetch(apiUrl + apiKey + "&q=" + city );
    // Check if the response status is 404 (city not found).
    if(response.status == 404){
       // Display an error messag and hide weather information.
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
     //If the city is found in the API, parse the JSON response.
    var data = await response.json();
   // Update the DOM elements with weather information  .
   document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
     // Set the weather icon based on the weather condition.
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png"
    } else if (data.weather[0].main == "Clear"){
       weatherIcon.src = "images/clear.png"
    } else if (data.weather[0].main == "Rain"){
       weatherIcon.src = "images/rain.png"
    } else if (data.weather[0].main == "Drizzle"){
       weatherIcon.src = "images/drizzle.png"
    } else if (data.weather[0].main == "Mist"){
       weatherIcon.src = "images/mist.png"
    } 
    // Display weather information and hide the error message.
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }

}
// Add a click event listener to the search button
searchBtn.addEventListener("click", () =>{
    // Call the checkWeather function with the value from the search input.
    checkWeather(searchBox.value);
});

