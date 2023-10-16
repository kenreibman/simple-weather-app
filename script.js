const apiKey = '7f5e8d374dcb9a8f73faf501d68793ef';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const defaultCity = 'new york'; // Set default city

let searchInput = document.querySelector('.search input');
let searchButton = document.querySelector('.search button');

const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    const data = await response.json();
    let temperature = Math.round(data.main.temp);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temperature').innerHTML = `${temperature}°C`;
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    if (data.weather[0].main == 'Clouds') {
      weatherIcon.src = 'images/clouds.png';
    } else if (data.weather[0].main == 'Clear') {
      weatherIcon.src = 'images/clear.png';
    } else if (data.weather[0].main == 'Rain') {
      weatherIcon.src = 'images/rain.png';
    } else if (data.weather[0].main == 'Snow') {
      weatherIcon.src = 'images/snow.png';
    } else if (data.weather[0].main == 'Drizzle') {
      weatherIcon.src = 'images/drizzle.png';
    } else if (data.weather[0].main == 'Thunderstorm') {
      weatherIcon.src = 'images/thunderstorm.png';
    }

    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
  }
}

// Call checkWeather with the deafult city when the page loads
document.addEventListener('DOMContentLoaded', () => {
  checkWeather(defaultCity);
});

searchButton.addEventListener('click', () => {
  checkWeather(searchInput.value);
});
