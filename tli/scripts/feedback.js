const feedbackData = './data/feedback.json'

const randomChoice = (options) => {
    let myCopyOpt = options;
    let myOptions = [];
    for (let i=0; i < 3; i++) {
        let index = Math.floor(Math.random() * myCopyOpt.length);
        myOptions.push(options[index]);
        myCopyOpt.splice(index, 1);
    }
    return myOptions;
}

const getThreeCards = (data) => {
    const response = randomChoice(data);
    console.log(response)
    return response;
}

const businessCards = async () => {
    try {
        const response = await fetch(feedbackData);
        const data = await response.json();
        const myChoices = await getThreeCards(data);
        
        return myChoices;
    } catch (error) {
        console.log(error);
    }
}

export default businessCards;