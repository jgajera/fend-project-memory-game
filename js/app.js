// // select cards (li) and put them into an array + get an initial array count
let cards = [...document.querySelectorAll('.card')];
const cardNum = cards.length;

/*   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// // Shuffle function from
// // http://stackoverflow.com/a/2450976
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

// // run our card (li) array through a good shuffle on page load
shuffle(cards);


// // save shuffled array into empty array for future use!
let cardsShuff = [];
for (let i = 0; i < cardNum; i++) {
  let cardContent = cards[i];
  cardsShuff.push(cardContent);
}

// // feed new shuffled array into the HTML
// // // 1. first clear current grid
const cardDeck = document.querySelector('.deck');
cardDeck.innerHTML = '';

// // // 2. insert new shuffled array as cards
for (let j = 0; j < cardNum; j++) {
  cardDeck.insertAdjacentHTML('afterbegin', cardsShuff[j].outerHTML);
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 */
// // // select cards in a fresh variable, select open cards, add event listener onto all cards and attach reveal card function to the event
let cardSelector = [...document.querySelectorAll('.card')];

let cardShow = [...document.querySelectorAll('.open')];

for (let k = 0; k < cardNum; k++) {
  cardSelector[k].addEventListener('click', matchFunction);
  cardSelector[k].addEventListener('click', cardReveal);

};


function cardReveal(callback) {
  // if card is already open, close it
  if (this.classList.contains('open') === true) {
    this.classList.remove('open');
    this.classList.remove('show');
    cardShow.pop(this);
  }
  // if card is matched, don't touch it
  else if (this.classList.contains('match') === true) {

  }
  // if card is just .card, add .open and .show
  else {
    this.classList.add('open', 'show');
    /*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
     */
    cardShow.push(this);
  }

  console.log(cardShow);

}



function matchFunction() {
  let openCards = [...document.querySelectorAll('.open')];

  let openNum = openCards.length;
  console.log(openCards, openNum);
  if (openNum = 2) {
    let firstPick = openCards[0].innerHTML;
    let secondPick = openCards[1].innerHTML;
    if (firstPick === secondPick) {
      openCards[0].classList.remove('show');
      openCards[1].classList.remove('show');
      openCards[0].classList.add('match');
      openCards[1].classList.add('match');
      openCards[0].classList.remove('open');
      openCards[1].classList.remove('open');
      openCards.pop(openCards[1]);
      openCards.pop(openCards[0]);
      return openCards;
    } else {
      openCards[0].classList.remove('show');
      openCards[1].classList.remove('show');
      openCards[0].classList.remove('open');
      openCards[1].classList.remove('open');
      openCards = [];
      return openCards;
    }
  } else if (openNum > 2) {
    openCards[0].classList.remove('show');
    openCards[1].classList.remove('show');
    openCards[0].classList.remove('open');
    openCards[1].classList.remove('open');
    openCards = [];
    return openCards;
  } else if (openNum = 36) {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
  }
  console.log(openCards);
  console.log(openNum);
}


/*  - if the list already has another card, check to see if the two cards match
 */
/*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */