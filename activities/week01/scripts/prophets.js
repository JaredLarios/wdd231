/* --- API Cards Information ----*/
const URL = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
/*
fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    const prophets = jsonObject['prophets'];
    prophets.forEach(displayProphets);
  });
*/
// Get Prophets Data
async function getProphetData() {
    const response = await fetch(URL);
    const data = await response.json();
    displayProphets(data.prophets);
}

// Execute getProphetsData Funciton
getProphetData();

// Display Prophets
function displayProphets(prophets) {
  // Create elements to add to the document
  prophets.forEach((prophet) => {
    let card = document.createElement('section');
    let h2 = document.createElement('h2');
    let portrait = document.createElement('img');
    let birthInfo = document.createElement('p');
    let numberPresident = '';
    numberPresident = prophet.order;
    numberPresident += numberPresident == 1 || numberPresident == 11 ? 'st' : ( numberPresident == 2 || numberPresident == 22 ? 'nd' : (numberPresident == 3 || numberPresident == 33) ? 'rd' : 'th' )

    // Change the textContent property of the h2 element to contain the prophet's full name
    h2.textContent = `${prophet.name} ${prophet.lastname}`;
    birthInfo.innerHTML = `<span>Date of Birth: ${prophet.birthdate}</span> <br><span>Place of Birth: ${prophet.birthplace}</span>`

    // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portait of ${prophet.name} ${prophet.lastname} - ${numberPresident} Latter-day President`);
    portrait.setAttribute('loading', 'lazy');

    // Add/append the section(card) with the h2 element
    card.appendChild(h2);
    card.appendChild(birthInfo);
    card.appendChild(portrait);
    // Add/append the existing HTML div with the cards class with the section(card)
    cards.appendChild(card);
  })     
}