let display = document.createElement("div");

document.getElementById("btn").addEventListener("click", () => {
    getcity()
})
async function getcity() {

    try {

        let city = document.getElementById("city-input").value;
        let op;
        let geores = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        let geodata = await geores.json();
        document.querySelector("#city-option").innerHTML = "";

        geodata.results.forEach(info => {
            op = document.createElement("option");
            op.value = `${info.latitude} ${info.longitude}`

            op.textContent = `${info.name}, ${info.admin2}, ${info.admin1}, ${info.country}`
            document.querySelector("#city-option").appendChild(op);

        });
        let select = document.getElementById("city-option");
        let [lat, lon] = select.value.split(" ");
        getWeather(lat, lon);
        console.log("ok");


    } catch (err) {
        console.log(err);
    }
}
let select = document.getElementById("city-option");
select.addEventListener("change", () => {
    let [lat, lon] = select.value.split(" ");
    getWeather(lat, lon)

})
async function getWeather(lat, lon) {
    let res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`);
    let data = await res.json();


    let select = document.getElementById("city-option");
    let city = select.options[select.selectedIndex].text;
    
    display.className = "weather-display";
    display.innerHTML = `City: ${city}<br>Temp: ${data.current.temperature_2m}<br>Humidity: ${data.current.relative_humidity_2m}`;
    document.body.appendChild(display);
    console.log("Temp:", data.current.temperature_2m);
    console.log("Humidity:", data.current.relative_humidity_2m);

}


