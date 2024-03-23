const apiKey = "11d17c6a92856c92d6515c1e1dad0d62";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?";

async function checkWeather() {
    let city = document.querySelector("#searchInput").value;
    if (city) {
        const response = await fetch(
            `${apiURL}q=${city}&appid=${apiKey}&units=metric`
        );
        //http://localhost:3000/search?city=${city}
        //http://localhost:3000/${city}

        const data = await response.json();
        console.log(data);

        if (data.cod !== "404") {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML =
                Math.round(data.main.temp) + "ºC";
            document.querySelector(".humidity").innerHTML =
                data.main.humidity + "%";
            document.querySelector(".wind").innerHTML =
                data.wind.speed + "km/h";

            const icon = data.weather[0].main.toLowerCase();

            document
                .querySelector(".weather img")
                .setAttribute("src", `weather-app-img/images/${icon}.png`);
        } else {
            document.querySelector(".city").style.fontSize = "26px";
            document.querySelector(".city").innerHTML = "Local Não Encontrado";

            document.querySelector(".temp").innerHTML = "";
            document.querySelector(".humidity").innerHTML = "";
            document.querySelector(".wind").innerHTML = "";

            const icon = data.weather[0].main.toLowerCase();

            document.querySelector(".weather img").setAttribute("src", " ");
        }
    }
}

document.querySelector(".card button").addEventListener("click", () => {
    checkWeather();
    document.querySelector("#searchInput").value = "";
});
