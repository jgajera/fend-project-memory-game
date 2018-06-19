/*
 * Create a list that holds all of your cards
 */

let cards = [...document.querySelectorAll('.card')];
const cardNum = cards.length;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


shuffle(cards);


// push shuffled array into empty array
let cardsShuff = [];
for (let i = 0; i < cardNum; i++) {
    let cardContent = cards[i];
    cardsShuff.push(cardContent);
}

// feed shuffled array into the HTML
// // // first clear current grid
const cardDeck = document.querySelector('.deck');
cardDeck.innerHTML = '';

// // // insert new shuffled array
for (let j = 0; j < cardNum; j++) {
    cardDeck.insertAdjacentHTML('afterbegin', cardsShuff[j].outerHTML);
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 */

let cardSelector = [...document.querySelectorAll('.card')];

let cardShow = [...document.querySelectorAll('.open')];

for (let k = 0; k < cardNum; k++) {
    cardSelector[k].addEventListener('click', cardReveal)
};

function cardReveal() {
    this.classList.add('open', 'show');
    /*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
     */
    cardShow.push(this);
    console.log(cardShow);
}


//if (cardShow.length > 2) {
//    this.classList.remove('open', 'show');
// }

/*  - if the list already has another card, check to see if the two cards match
 */
console.log(cardShow.length);
/*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */