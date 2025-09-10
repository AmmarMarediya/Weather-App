  async function getCityWeather() {
      let city = document.getElementById("city").value;
      if (!city) {
        alert("Please enter a city name");
        return;
      }

      try {
        // 1. Geocoding API se lat/lon lo
        let geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        let geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
          document.getElementById("result").innerText = "City not found!";
          return;
        }

        let lat = geoData.results[0].latitude;
        let lon = geoData.results[0].longitude;

        // 2. Weather API call
        let weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        let weatherData = await weatherRes.json();

        // 3. Output show
        let temp = weatherData.current_weather.temperature;
        let wind = weatherData.current_weather.windspeed;

        document.getElementById("result").innerHTML =
          `<b>${city}</b><br>Temperature: ${temp}°C <br>Wind Speed: ${wind} km/h`;

      } catch (err) {
        console.error(err);
        document.getElementById("result").innerText = "Error fetching data.";
      }
    }

