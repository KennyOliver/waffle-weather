function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");
  let geolocation = document.getElementById("geolocation");
  let weather_icon = document.getElementById("weather-icon");

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "4a8e56d76aab3920b24af328c175da5b";

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success,error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url = `${api}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data); //shows all available API data
        location.innerHTML = data.name;
        temperature.innerHTML = Math.round(data.main.temp) + "°C";
        description.innerHTML = data.weather[0].main;
        geolocation.innerHTML = `(${latitude}°, ${longitude}°)`;
        
        weather_icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

getWeather();