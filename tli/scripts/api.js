const url = `https://api.frankfurter.app/latest?base=USD`;
const section = document.querySelector("#currency");

const ratesList = ["MXN", "CAD", "EUR", "GBP"]

// get data from api
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayCurrency(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayCurrency(data) {
    section.innerHTML = `
            <h2>${data.date} Currency</h2>
        `
    
    ratesList.forEach( curr => {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        console.log(curr);
        card.innerHTML = `
            <div class="card-header">
                <h3>${curr} -> USD</h3>
            </div>
            <div class="card-body">
                <p>${curr}${data.rates[curr]}</p>
            </div>
        `
        section.appendChild(card);
    });

}