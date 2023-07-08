let apiKey = `85bbd3d16a2dfe0ecf253c7ae1e8fe03`;

let todayDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let min = todayDate.getMinutes();
let hr = todayDate.getHours();
let time = `${hr}:${min}`;
let day = days[todayDate.getDay()];

let heading = document.querySelector("#today");
heading.innerHTML = `${day}, ${time}`;

function getTemp(response) {
  let temp = response.data.main.temp;
  temp = Math.round(temp);
  let displayTemp = document.querySelector("#current-temp");
  displayTemp.innerHTML = `Currently ${temp}°C`;
}

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let heading = document.querySelector("#heading");
  heading.innerHTML = city.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp); 
    
}
let btnSearch = document.querySelector(".btn");
btnSearch.addEventListener("click",getCity);

function convertToCel() {
  let temp = 12;
  let h2 = document.querySelector("#current-temp");
  h2.innerHTML = `Curently ${temp}°C`;
  document.getElementById("degree-c").style.color = "black";
  document.getElementById("degree-f").style.color = "grey";
  document.getElementById("degree-c").style.fontSize = "30px";
  document.getElementById("degree-f").style.fontSize = "20px";
}

function convertToFah() {
  let temp = 53;
  let h2 = document.querySelector("#current-temp");
  h2.innerHTML = `Curently ${temp}°F`;
  document.getElementById("degree-c").style.color = "grey";
  document.getElementById("degree-f").style.color = "black";
  document.getElementById("degree-c").style.fontSize = "20px";
  document.getElementById("degree-f").style.fontSize = "30px";
}

let btnCel = document.querySelector("#degree-c");
btnCel.addEventListener("click", convertToCel);

let btnFah = document.querySelector("#degree-f");
btnFah.addEventListener("click", convertToFah);

function showTemp(position){
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  function displayTemp(response){
    let currentTemp = Math.round(response.data.main.temp);
    let currentLocation = response.data.name;
    let heading = document.querySelector("#heading");
    heading.innerHTML = currentLocation;
    let tempHeading = document.querySelector("#current-temp");
    tempHeading.innerHTML = `Currently ${currentTemp}°C`;
  }
  axios.get(apiUrl).then(displayTemp);
}
function getLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showTemp);
}
let btnLocation = document.querySelector("#location-button");
btnLocation.addEventListener("click",getLocation);