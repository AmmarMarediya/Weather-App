let display = document.createElement("div");
display.className = "weather-display";

document.getElementById("btn").addEventListener("click", () => {
    getcity()
})
async function getcity() {

    try {

        let select = document.getElementById("city-option");
        select.innerHTML = "";
        let city = document.getElementById("city-input").value.trim();
        if (!city) {
            display.textContent = "🔴Please enter city⚠️";
            document.body.appendChild(display);

            return;
        }
        display.className = "";
        display.textContent = "";
        let op;
        let geores = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        let geodata = await geores.json();

       

        if (!geodata.results || geodata.results.length === 0) {
            select.innerHTML = "<option>🥲City not found⚠️</option>"
            return;

        }

        geodata.results.forEach(info => {
            op = document.createElement("option");
            op.value = `${info.latitude} ${info.longitude}`

            op.textContent = `${info.name}, ${info.admin2}, ${info.admin1}, ${info.country}`
            document.querySelector("#city-option").appendChild(op);

        });
        //access first value in options by default
        let [lat, lon] = select.value.split(" ");
        getWeather(lat, lon);

        
        select.addEventListener("change", () => {
            let [lat, lon] = select.value.split(" ");
            getWeather(lat, lon)

        })
    } catch (err) {
        console.log(err);
    }
}

async function getWeather(lat, lon) {
    let res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`);
    let data = await res.json();


    let select = document.getElementById("city-option");
    let city = select.options[select.selectedIndex].text;

    display.className = "weather-display";
    display.innerHTML = `City: ${city}<br>Temp: 🌡️${data.current.temperature_2m}°C <br>Humidity: 💧${data.current.relative_humidity_2m}%`;
    document.body.appendChild(display);
}


