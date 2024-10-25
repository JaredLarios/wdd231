// Get Data
const jsonData = './data/feedback.json'
let data

// Get DOM Elements
const directory = document.querySelector('#directory');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

directory.setAttribute("class", "grid");
getData()

// Get Data from json Data
async function getData() {
    try {
        const response = await fetch(jsonData);
        data = await response.json();
        await createCard(data);
    } catch {
        console.error({response: 404})
    }
}

// Event Listener
gridButton.addEventListener('click', ()=> {
    directory.setAttribute("class", "grid");
    createCard(data);
});
listButton.addEventListener('click', ()=> {
    directory.setAttribute("class", "list");
    createCard(data);
});


// Creating Cards
function createCard(data) {
    console.log(data);
    directory.innerHTML = ``;

    if(directory.getAttribute("class") !== "grid") {
        let table = document.createElement('table');
        let header = document.createElement('tr');
        let dateH = document.createElement('th');
        let usernameH = document.createElement('th');
        let commentH = document.createElement('th');
        let starsH = document.createElement('th');

        dateH.innerText = 'Date'
        usernameH.innerText = 'Username'
        commentH.innerText = 'Comment'
        starsH.innerText = 'Stars'


        header.appendChild(dateH);
        header.appendChild(usernameH);
        header.appendChild(commentH);
        header.appendChild(starsH);
        table.appendChild(header);
        directory.append(table);

        data.forEach(element => {
            let row = document.createElement('tr')
            row.innerHTML = `
                <td>${element.date}</td>
                <td>@${element.username}</td>
                <td>${element.comment}</td>
                <td>${element.stars}</td>
            `
            table.appendChild(row);
        })
    
    } else {
        data.forEach(element => {
            let card = document.createElement('div');
            card.setAttribute("class", "card")
            card.innerHTML = `
            <div class="card-header">
                <h3>@${element.username}</h3>
                <p>${element.date}</p>
            </div>
            <div class="card-body">
                <p>${element.comment}</p>
            </div>
            `
            directory.appendChild(card);
        });
    }
}