import apiFetch from "./api.js";

// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const data = await apiFetch();

const sunTime = (data) => {
    let timezoneOffset = data.timezone;
    // Convert Unix timestamp to milliseconds and add timezone offset
    const sunrise = new Date((data.sunrise + timezoneOffset) * 1000);
    const sunset = new Date((data.sunset + timezoneOffset) * 1000);
    // Format the time as HH:MM:SS
    const formatTime = (date) => date.toISOString().substr(11, 8);

    return {sunrise: formatTime(sunrise), sunset: formatTime(sunset)}
}

if(data){
    displayResults(data.list[0], data.city);
}

// retreive in dom
function displayResults(data, suntime) {
    const {sunrise, sunset} = sunTime(suntime);
    currentTemp.innerHTML = `
                            <p>${data.main.temp}&deg; F</p>
                            <p>${data.weather[0].description}</p>
                            <p>High: ${data.main.temp_max}&deg;</p>
                            <p>Low: ${data.main.temp_min}&deg;</p>
                            <p>Humidity: ${data.main.humidity}%</p>
                            <p>Sunrise: ${sunrise}</p>
                            <p>Sunset: ${sunset}</p>
                            `;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}
console.log(data.list[0]);