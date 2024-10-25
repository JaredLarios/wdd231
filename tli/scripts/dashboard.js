import apiFetch from "./api.js";
import getForecast from "./forecast.js";
import feedbackCards from "./feedback.js";


/* Variables */
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const data = await apiFetch();

// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
// const weatherIcon = document.querySelector('#weather-icon');
// const weatherForecast = document.querySelector('#weather-forecast');
const feedbackCard = document.querySelector('#feedback-cards');
const joinButton = document.querySelector('#join');

joinButton.onclick = function() {
    location.href = "./join.html";
}


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
    /*
    displayResults(data.list[0], data.city);
    const dataForecast = getForecast(data.list);
    displayForecast(dataForecast, data.list[0].main.temp);
    */
    const feedback = await feedbackCards();
    displayFeedbackCard(feedback);
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
    const tomorrowDate = new Date(todaysDay.getDate() + 1);
    const dayAfterDate = new Date(todaysDay.getDate() + 2);
    const tomorrowsDay = daysOfWeek[tomorrowDate.getDay()]
    const dayAfterDay = daysOfWeek[dayAfterDate.getDay()]


    const {tomorrow, dayAfter} = data;

    weatherForecast.innerHTML = `
                                <p>Today: ${today}&deg</p>
                                <p>${tomorrowsDay}: ${tomorrow.main.temp}&deg</p>
                                <p>${dayAfterDay}: ${dayAfter.main.temp}&deg</p>
                                `
}

function displayFeedbackCard(data) {
    feedbackCard.innerHTML = ``;
    data.forEach(element => {
        let card = document.createElement('div');
        let cardHeader = document.createElement('div');
        let cardBody = document.createElement('div');
        let h3 = document.createElement('h3');
        let fDate = document.createElement('p');

        card.setAttribute('class', 'card');
        cardHeader.setAttribute('class', 'card-header');
        cardBody.setAttribute('class', 'card-body');

        h3.innerText = '@' + element.username;
        fDate.innerText = element.date;


        cardBody.innerHTML = `
                                        <div>
                                            <p>${element.comment}</p>
                                            <p>❤️${element.stars}</p>
                                        </div>
                                `
        cardHeader.appendChild(h3);
        cardHeader.appendChild(fDate);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        feedbackCard.appendChild(card);
    })
}