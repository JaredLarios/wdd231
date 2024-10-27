import feedbackCards from "./feedback.js";


// select HTML elements in the document
const feedbackCard = document.querySelector('#feedback-cards');

async function display() {
    const feedback = await feedbackCards();
    displayFeedbackCard(feedback);
}

display();

// retreive in dom

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
        feedbackCard.append(card);
    })
}