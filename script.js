const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");
const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");


async function getWeather() {

  const city = cityInput.value.trim();

  if (city === "") {
    return;
  }

  try {

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error("City not found");
    }

    cityName.textContent = data.name;

    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    condition.textContent = data.weather[0].description;

    humidity.textContent = `${data.main.humidity}%`;

    windSpeed.textContent = `${data.wind.speed} m/s`;

    weatherCard.classList.remove("hidden");

    errorMessage.classList.add("hidden");

  } catch (error) {
    weatherCard.classList.add("hidden");
    errorMessage.textContent = "City not found. Please try again.";
    errorMessage.classList.remove("hidden");
  }
}


searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});