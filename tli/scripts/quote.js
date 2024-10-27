const myBusiPoistion = document.querySelector('.regulation')
const errMessage = document.querySelector('#posErr')
const dateEntry = document.querySelector('#date')
const btn = document.querySelector('.submitBtn')


/* ------   Date Time    ------*/

let date = new Date
console.log(date)

dateEntry.textContent = date;


/* ------   Validation    ------*/
function validate () {
    const regex = /(\w+|\s+){7,}/

    const val = myBusiPoistion.value.match(regex)

    console.log(val)
    
    if (val == null) {
        myBusiPoistion.classList.toggle('valid');
        errMessage.innerHTML = 'The postion must have at least 7 character';
        console.log(errMessage)
    }
    else {
        myBusiPoistion.classList.toggle('invalid');
    }
}

btn.addEventListener('click', validate)