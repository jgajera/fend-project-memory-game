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
  // cardSelector[k].addEventListener('click', matchFunction);
  cardSelector[k].addEventListener('click', cardReveal);
  cardSelector[k].addEventListener('click', moveCounter);

};


function cardReveal(callback) {
  // if card is already open, close it
  if (this.classList.contains('open') === true) {
    this.classList.remove('open', 'show', 'error');
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

  let openCards = [...document.querySelectorAll('.open')];

  let openNum = openCards.length;

  if (openNum >= 1) {
    if (openNum === 1) {
      let firstPick = openCards[0].innerHTML;
    } else if (openNum = 2) {
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
      } else if (firstPick !== secondPick) {
        openCards[1].classList.add('error');
        openCards[0].classList.add('error');
        // show both cards for 1 second so user can memorize both cards, then flip them back over to not show/open
        setTimeout(removeShow, 1000);
        return openCards;
      }
    }
  }

  // remove 'error' class from all cards on every run through, only add error class in the instance above
  for (let k = 0; k < cardNum; k++) {
    // cardSelector[k].addEventListener('click', matchFunction);
    cardSelector[k].classList.remove('error');
  };


  // function to remove open and show classes after timeout function when two cards don't match
  function removeShow() {
    openCards[0].classList.remove('show');
    openCards[1].classList.remove('show');
    openCards[0].classList.remove('open');
    openCards[1].classList.remove('open');
  }
}


/*
Timer - taken partially from https://www.sitepoint.com/community/t/want-timer-to-start-on-button-click-always-starts-on-load-why/291783
 */

function startTimer() {
  var counter = 0;
  setInterval(function() {
    counter++;
    if (counter >= 0) {
      // convert counter to minutes, round down to get whole number, and add 0 in front if it's a single digit
      let rawMins = Math.floor(counter / 60);
      let mins = rawMins.toString().padStart(2, "0");
      // convert leftover seconds into double digits
      let rawSeconds = counter - (mins * 60);
      let seconds = rawSeconds.toString().padStart(2, "0");
      // inject mins and seconds into HTML as a timer
      span = document.getElementById("timerDiv");
      span.innerHTML = mins + ":" + seconds;
    }
  }, 1000);
  cardDeck.removeEventListener('click', startTimer);
}


cardDeck.addEventListener('click', startTimer);


// // // restart button functionality
const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', function restart() {
  document.getElementById("timerDiv").innerHTML = "";
  cardDeck.addEventListener('click', startTimer);
});




/*

Move Counter and Star Rating

 */
let moveCount = 0;
let move = document.querySelector('.moves');
const starRating = document.querySelector('.stars');
const stars = [...document.querySelectorAll('.stars li')];

// initialize stars at 5 stars
starRating.innerHTML = '';
for (let l = 0; l < 5; l++) {
  starRating.insertAdjacentHTML('afterbegin', stars[l].outerHTML);
}


function moveCounter() {
  moveCount++;
  move.innerHTML = moveCount;

  // if moves = or less than 10, 5 stars
  if (moveCount <= 10) {
    starRating.innerHTML = '';

    for (let l = 0; l < 5; l++) {
      starRating.insertAdjacentHTML('afterbegin', stars[l].outerHTML);
    }
  } else if (moveCount > 10 && moveCount <= 20) {
    // if moves between 10 and 20, 4 stars
    starRating.innerHTML = '';

    for (let m = 0; m < 4; m++) {
      starRating.insertAdjacentHTML('afterbegin', stars[m].outerHTML);
    }
  } else if (moveCount > 20 && moveCount <= 30) {
    // if moves between 20 and 30, 3 stars
    starRating.innerHTML = '';

    for (let m = 0; m < 3; m++) {
      starRating.insertAdjacentHTML('afterbegin', stars[m].outerHTML);
    }
  } else if (moveCount > 30 && moveCount <= 40) {
    // if moves between 30 and 40, 2 stars
    starRating.innerHTML = '';

    for (let m = 0; m < 2; m++) {
      starRating.insertAdjacentHTML('afterbegin', stars[m].outerHTML);
    }
  } else if (moveCount > 40) {
    // if moves over 40, 1 star
    starRating.innerHTML = '';

    for (let m = 0; m < 1; m++) {
      starRating.insertAdjacentHTML('afterbegin', stars[m].outerHTML);
    }
  }
}




/*

Congratulations Modal

*/

// launch this baby when all cards are matched... keep checking to see if 
function congratsModal() {
  // find how many cards are open, and how many are matched
  let cardsOpen = [...document.querySelectorAll('.open')];
  let cardsMatched = [...document.querySelectorAll('.match')];

  // find how many cards are closed by subtracting matched + open from total
  let remainingClosed = 16 - cardsOpen.length - cardsMatched.length;

  if (remainingClosed === 0) {
    let modalBody = document.querySelector('.modal-body');

    let finalStars = [...document.querySelectorAll('.stars li')];
    console.log(finalStars);

    let finalMoves = document.querySelectorAll('.moves').textContent;
    console.log(finalMoves);

    modalBody.insertAdjacentHTML('afterbegin', finalStars);
    modalBody.insertAdjacentHTML('afterbegin', finalMoves);

    document.getElementById('modal-link').click();
  }

}

cardDeck.addEventListener('click', congratsModal);