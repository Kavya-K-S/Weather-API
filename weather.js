const apiKey = '51f070d0732a187d43193dfa79a3c7e9'; // Replace with your OpenWeatherMap API key

document.getElementById('fetchWeather').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();

    if (!city) {
        showError('Please enter a city name!');
        return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or invalid API request.');
            }
            return response.json();
        })
        .then(data => {
            alert(apiURL);
            displayWeather(data);
        })
        .catch(error => {
            showError(error.message);
        });
});

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function showError(message) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `<p class="error">${message}</p>`;
}
