const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "4b650b7292055427402fe152e6276b16";

weatherForm.addEventListener("submit", async event => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError("Could not retrieve weather data. Try another city.");
    }
  } else {
    displayError("Please enter a city.");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Weather data fetch failed.");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }]
  } = data;

  // Clear card content
  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description.charAt(0).toUpperCase() + description.slice(1);
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return "⛈️";
  if (weatherId >= 300 && weatherId < 400) return "🌦️";
  if (weatherId >= 500 && weatherId < 600) return "🌧️";
  if (weatherId >= 600 && weatherId < 700) return "❄️";
  if (weatherId >= 700 && weatherId < 800) return "🌫️";
  if (weatherId === 800) return "☀️";
  if (weatherId > 800 && weatherId < 810) return "☁️";
  return "❓";
}

function displayError(message) {
  card.textContent = "";
  card.style.display = "flex";

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.appendChild(errorDisplay);
}





/*
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "4b650b7292055427402fe152e6276b16";

weatherForm.addEventListener("submit", async event => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError("City not found. Try another.");
    }
  } else {
    displayError("Please enter a city name.");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Network response was not OK");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }]
  } = data;

  card.innerHTML = ""; // clear old content
  card.style.display = "flex";

  const cityDisplay = createElement("h1", city, "cityDisplay");
  const tempDisplay = createElement("p", `${(temp - 273.15).toFixed(1)}°C`, "tempDisplay");
  const humidityDisplay = createElement("p", `Humidity: ${humidity}%`, "humidityDisplay");
  const descDisplay = createElement("p", description, "descDisplay");
  const weatherEmoji = createElement("p", getWeatherEmoji(id), "weatherEmoji");

  card.append(cityDisplay, tempDisplay, humidityDisplay, descDisplay, weatherEmoji);
}

function getWeatherEmoji(id) {
  if (id >= 200 && id < 300) return "⛈️";
  if (id >= 300 && id < 400) return "🌦️";
  if (id >= 500 && id < 600) return "🌧️";
  if (id >= 600 && id < 700) return "❄️";
  if (id >= 700 && id < 800) return "🌫️";
  if (id === 800) return "☀️";
  if (id >= 801 && id <= 804) return "☁️";
  return "❓";
}

function displayError(message) {
  card.innerHTML = "";
  card.style.display = "flex";
  const errorDisplay = createElement("p", message, "errorDisplay");
  card.appendChild(errorDisplay);
}

function createElement(tag, text, className) {
  const el = document.createElement(tag);
  el.textContent = text;
  el.className = className;
  return el;
}

*/




