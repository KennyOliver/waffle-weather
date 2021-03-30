function getWeather() {
  let location = document.getElementById("location");
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let feelsLike = document.getElementById("feels-like");
  let tempLowHigh = document.getElementById("temp-low-high");
  let wind = document.getElementById("wind");
  let humidity = document.getElementById("humidity");
  let pressure = document.getElementById("pressure");
  let geolocation = document.getElementById("geolocation");
  let weatherIconContainer = document.getElementById("weather-icon-container");

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "9cf1ef326b896d750e1017c7bdd96199";

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success,error);

  function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let url = `${api}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data); //shows all available API data
        location.innerHTML = data.name + ", " + data.sys.country;
        feelsLike.innerHTML = Math.round(data.main.feels_like) + "°";
        description.innerHTML = data.weather[0].description;
        temperature.innerHTML = `<b>Actual temp: </b> ${Math.round(data.main.temp)}°`;
        tempLowHigh.innerHTML = `<b>L:</b> ${Math.round(data.main.temp_min)}°` + "&nbsp;".repeat(4) + `<b>H:</b> ${Math.round(data.main.temp_max)}°`;
        wind.innerHTML = `<b>Wind:</b> ${degToCompass(data.wind.deg)} ${Math.round(data.wind.speed)}m/s`;
        humidity.innerHTML = `<b>Humidity:</b> ${data.main.humidity}%`;
        pressure.innerHTML = `<b>Pressure:</b> ${data.main.pressure} hPa`;
        cloudiness.innerHTML = `<b>Cloudiness:</b> ${data.clouds.all}%`;
        //geolocation.innerHTML = `(${latitude}°, ${longitude}°)`;
        
        
        console.log("<-- Useful Info -->");
        
        let icon = data.weather[0].icon;
        console.log(`Weather icon: ${icon}`);
        weatherIconContainer.innerHTML = `<img src="weatherIconsFlat/${icon}.png" height="150px" width="auto">`;
        //weatherIconContainer.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`; //icons don't work in browser for some reason!
        
        enableDarkMode(data.sys.sunset);
        
        console.log("=".repeat(20));
      });
  }

  function error() {
    location.innerHTML = "Can\'t get your location";
  }
}

function degToCompass(deg) {
    var val = Math.floor((deg / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

function enableDarkMode(apiSunsetUnixTimestamp) {
  if (Date.now()/1000 > apiSunsetUnixTimestamp) {
    console.log("Past sunset:\t" + true);
    document.body.className = "dark-mode";
    console.log("Mode applied:\tdark");
  } else {
    console.log("Past sunset:\t" + false);
    document.body.className = "light-mode";
    console.log("Mode applied:\tlight");
  }
}


getWeather();
setInterval(getWeather, 60000);