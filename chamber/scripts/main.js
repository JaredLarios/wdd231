// Get DOM Elements
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

// Get Dates
const today = new Date()
const lastModifiedDate = new Date(document.lastModified);

// Render to DOM Content
currentYear.innerHTML = `${today.getFullYear()}`
lastModified.innerHTML = `Last Modification: ${lastModifiedDate}`