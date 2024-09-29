// Variables
let membersData
const membership = ["member", "silver", "gold"]

// Get Data
const jsonData = '../chamber/data/members.json'

// Get DOM Elements
const directory = document.querySelector('#directory');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

directory.setAttribute("class", "grid");
getProphetData()

// Get Data from json Data
async function getProphetData() {
    try {
        const response = await fetch(jsonData);
        const data = await response.json();
        membersData = data
        await createMemeberCard(membersData);
        console.log(data)
    } catch {
        console.error({response: 404})
    }
}

// Event Listener
gridButton.addEventListener('click', ()=> {
    directory.setAttribute("class", "grid");
    createMemeberCard(membersData);
});
listButton.addEventListener('click', ()=> {
    //let filterCourse = courses.filter(course => course.subject === 'CSE');
    directory.setAttribute("class", "list");
    createMemeberCard(membersData);
});


// Creating Cards
function createMemeberCard(filterMemebers,) {
    directory.innerHTML = ``;
    filterMemebers.forEach(member => {
        let card = document.createElement('div');
        let headerCard = document.createElement('div');
        let bodyCard = document.createElement('div');
        let bodyContainer = document.createElement('div');
        let footerCard = document.createElement('div');

        // classes
        card.setAttribute('class','card');
        headerCard.setAttribute('class','card-header');
        bodyCard.setAttribute('class','card-body');
        footerCard.setAttribute('class','card-footer');

        // header
        // new elements
        let h3 = document.createElement('h3');
        let icon = document.createElement('span');
        let memeberP = document.createElement('p');


        h3.textContent = member.name;
        memeberP.textContent = membership[member.membership -1];
        icon.setAttribute('css', `${member.iso_certify? 'cert': ''}`)

        // add to dom
        headerCard.appendChild(h3);
        headerCard.appendChild(icon);
        headerCard.appendChild(memeberP);

        
        // body
        // new elements
        let logo = document.createElement('img');
        let address = document.createElement('p');
        let email = document.createElement('p');
        let website = document.createElement('p');
        let phone = document.createElement('p');

        // logo.setAttribute('src', `../images/${member.file_name}`)
        logo.setAttribute('src', `https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg`)
        logo.setAttribute('width', `250`)
        address.textContent = member.address
        email.textContent = member.email
        website.innerHTML = `<a href='${member.url}'>${member.url}</a>`;
        phone.textContent = member.phone;
        
        // add to dom
        bodyCard.appendChild(logo);
        bodyContainer.appendChild(address);
        bodyContainer.appendChild(email);
        bodyContainer.appendChild(website);
        bodyContainer.appendChild(phone);
        bodyCard.appendChild(bodyContainer);

        // footer
        // new elements
        let fund_year = document.createElement('p');

        fund_year.textContent = `since ${member.fund_year}`;

        // add to dom
        footerCard.appendChild(fund_year);


        card.appendChild(headerCard);
        card.appendChild(bodyCard);
        card.appendChild(footerCard);
        directory.appendChild(card);
    });
}