import apiFetch from "./api.js";
import getForecast from "./forecast.js";
import businessCards from "./business.js";


/* Variables */
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const data = await apiFetch();

// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherForecast = document.querySelector('#weather-forecast');
const businessCard = document.querySelector('#business-cards');


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
    const dataForecast = getForecast(data.list);
    displayForecast(dataForecast, data.list[0].main.temp);
    const business = await businessCards();
    console.log(business);
    displayBusinessCard(business);
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
}

function displayForecast(data, today) {
    const todaysDay = new Date();
    const tomorrowsDay = daysOfWeek[todaysDay.getDay() +1]
    const dayAfterDay = daysOfWeek[todaysDay.getDay() +2]

    const {tomorrow, dayAfter} = data;

    weatherForecast.innerHTML = `
                                <p>Today: ${today}&deg</p>
                                <p>${tomorrowsDay}: ${tomorrow.main.temp}&deg</p>
                                <p>${dayAfterDay}: ${dayAfter.main.temp}&deg</p>
                                `
}

function displayBusinessCard(data) {
    businessCard.innerHTML = ``;
    data.forEach(element => {
        let card = document.createElement('div');
        let cardHeader = document.createElement('div');
        let cardBody = document.createElement('div');
        let h3 = document.createElement('h3');

        card.setAttribute('class', 'card');
        cardHeader.setAttribute('class', 'card-header');
        cardBody.setAttribute('class', 'card-body');

        h3.innerText = element.name


        cardBody.innerHTML = `
                                        <div>
                                            <img src='./images/${element.file_name}.jpg' alt='${element.name}' width='150'>
                                        </div>
                                        <div>
                                            <p>Email: ${element.email}</p>
                                            <p>Phone: ${element.phone}</p>
                                            <p>URL: <a href='${element.url}'>${element.url}</p>
                                        </div>
                                `
        cardHeader.appendChild(h3)
        card.appendChild(cardHeader)
        card.appendChild(cardBody)
        businessCard.appendChild(card)
    })
}