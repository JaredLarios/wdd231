// Get DOM Elements
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');

// Get Dates
const today = new Date()
const lastModifiedDate = new Date(document.lastModified);

// Render to DOM Content
currentYear.innerHTML = `${today.getFullYear()}`
lastModified.innerHTML = `Last Modification: ${lastModifiedDate}`

// Eevents Listener
hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
})