/*

Janki Gajera - Udacity FEND Project #2 -- Memory Card Game

*/


// // select cards (li) and put them into an array + get an initial array count
let cards = [...document.querySelectorAll('.card')];
const cardNum = cards.length;
const cardDeck = document.querySelector('.deck');

//   - shuffle the list of cards using the provided "shuffle" method below
// // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  // // save shuffled array into empty array for future use!
  let cardsShuff = [];
  for (let i = 0; i < cardNum; i++) {
    let cardContent = cards[i];
    cardsShuff.push(cardContent);
  }

  // // feed new shuffled array into the HTML
  // // // 1. first clear current grid
  cardDeck.innerHTML = '';

  // // // 2. insert new shuffled array as cards
  for (let j = 0; j < cardNum; j++) {
    cardDeck.insertAdjacentHTML('afterbegin', cardsShuff[j].outerHTML);
  }

  return array;


}

// // run our card (li) array through a good shuffle on page load
shuffle(cards);



// set up the event listener for a card
// // // select cards in a fresh variable, select open cards, add event listener onto all cards and attach reveal card function to the event
let cardSelector = [...document.querySelectorAll('.card')];

cardEvents(cardSelector);

function cardEvents(n) {
  for (let k = 0; k < cardNum; k++) {
    n[k].addEventListener('click', cardReveal);
    n[k].addEventListener('click', moveCounter);
  }
}

function cardReveal(callback) {
  let cardShow = [...document.querySelectorAll('.open')];

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


  let openCards = [...document.querySelectorAll('.open')];

  let openNum = openCards.length;

  if (openNum >= 1) {
    if (openNum === 1) {
      let firstPick = openCards[0].innerHTML;
    } else if (openNum = 2) {
      let firstPick = openCards[0].innerHTML;
      let secondPick = openCards[1].innerHTML;
      if (firstPick === secondPick) {
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
        setTimeout(removeShow, 400);
        return openCards;
      }
    }
  }


  // remove 'error' class from all cards on every run through, only add error class in the instance above
  let cardSelect = [...document.querySelectorAll('.card')];

  for (let o = 0; o < cardNum; o++) {
    // cardSelector[k].addEventListener('click', matchFunction);
    cardSelect[o].classList.remove('error');
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

Timer


taken partially from https://www.sitepoint.com/community/t/want-timer-to-start-on-button-click-always-starts-on-load-why/291783

 */

timerSpan = document.getElementById("timerDiv");
// init timer at 0
let m = 0;

let timerStart;

let clockStopped = true;

function timerFunction() {
  timerStart = setInterval(function startTimer() {

    if (clockStopped = true) {
      // add 1 second to timer as time goes on
      m++;
      if (m >= 0) {
        // convert counter to minutes, round down to get whole number, and add 0 in front if it's a single digit
        let rawMins = Math.floor(m / 60);
        let mins = rawMins.toString().padStart(2, "0");
        // convert leftover seconds into double digits
        let rawSeconds = m - (mins * 60);
        let seconds = rawSeconds.toString().padStart(2, "0");
        // inject mins and seconds into HTML as a timer
        timerSpan.innerHTML = mins + ":" + seconds;
      }
      // remove the event listener on the card deck so timer doesn't keep resetting
      removeEventListenerTimer();
      clockStopped = false;
    }
  }, 1000);
}

cardDeck.addEventListener('click', timerFunction);

function removeEventListenerTimer() {
  cardDeck.removeEventListener('click', timerFunction);
};



/*

Restart Button

*/


// // // restart button functionality
const restartBtn = document.querySelector('.restart-link');
console.log(restartBtn);

restartBtn.addEventListener('click', resetFunction);

function resetFunction() {
  // on restart button click, shuffle cards
  shuffle(cards);

  // and clear timer HTML
  m = 0;
  clockStopped = true;
  clearInterval(timerStart);
  timerSpan.innerHTML = "00:00";
  cardDeck.addEventListener('click', timerFunction);

  moveCount = 0;
  moveCounter();

  let cardSelect = [...document.querySelectorAll('.card')];
  cardEvents(cardSelect);

}




/*

Move Counter and Star Rating

 */


// grab stars so we can inject HTML and decrement as moves go up
const removeStars = document.querySelector('.stars');
const stars = [...document.querySelectorAll('.stars li')];

// initialize stars at 5 stars
removeStars.innerHTML = '';
for (let l = 0; l < 5; l++) {
  removeStars.insertAdjacentHTML('afterbegin', stars[l].outerHTML);
}

// init move counter at 0 so we can add onto it later
let moveCount = 0;

function moveCounter() {
  // grab move HTML to inject counter later
  let move = document.querySelector('.moves');


  moveCount++;
  move.innerHTML = Math.floor(moveCount / 2);

  // if moves = or less than 10, 5 stars
  if (moveCount <= 10) {
    removeStars.innerHTML = '';

    for (let p = 0; p < 5; p++) {
      removeStars.insertAdjacentHTML('afterbegin', stars[p].outerHTML);
    }
  } else if (moveCount > 10 && moveCount <= 20) {
    // if moves between 10 and 20, 4 stars
    removeStars.innerHTML = '';

    for (let q = 0; q < 4; q++) {
      removeStars.insertAdjacentHTML('afterbegin', stars[q].outerHTML);
    }
  } else if (moveCount > 20 && moveCount <= 30) {
    // if moves between 20 and 30, 3 stars
    removeStars.innerHTML = '';

    for (let r = 0; r < 3; r++) {
      removeStars.insertAdjacentHTML('afterbegin', stars[r].outerHTML);
    }
  } else if (moveCount > 30 && moveCount <= 40) {
    // if moves between 30 and 40, 2 stars
    removeStars.innerHTML = '';

    for (let s = 0; s < 2; s++) {
      removeStars.insertAdjacentHTML('afterbegin', stars[s].outerHTML);
    }
  } else if (moveCount > 40) {
    // if moves over 40, 1 star
    removeStars.innerHTML = '';

    for (let t = 0; t < 1; t++) {
      removeStars.insertAdjacentHTML('afterbegin', stars[t].outerHTML);
    }
  }
}




/*

Congratulations Modal

*/

// launch this baby when all cards are matched... keep checking to see if number of remaining cards is 0
cardDeck.addEventListener('click', congratsModal);

function congratsModal() {
  // find how many cards are open, and how many are matched
  let cardsOpen = [...document.querySelectorAll('.open')];
  let cardsMatched = [...document.querySelectorAll('.match')];

  // find how many cards are closed by subtracting matched + open from total num of cards (16)
  let remainingClosed = 16 - cardsOpen.length - cardsMatched.length;

  // if there are no more open cards, launch the congrats modal
  if (remainingClosed === 0) {

    // grab how many stars are left for the rating, set variable to the final stars div
    let finalStars = [...document.querySelectorAll('.stars li')];
    let finalStarAmt = finalStars.length;
    let finalStarsDiv = document.querySelector('#finalStars');

    // grab how many moves were recorded, set variable to the final moves div
    let finalMoves = "<strong>Total Moves: </strong>" + document.querySelector('.moves').innerText;
    let finalMovesDiv = document.querySelector('#finalMoves');

    // grab the time  recorded, set variable to the final time div
    let finalTime = "<strong>Final Time: </strong>" + document.querySelector('#timerDiv').innerText;
    let finalTimeDiv = document.querySelector('#finalTime');

    // insert grabbed stars, move count, and time and injects into HTML
    for (let i = 0; i < finalStarAmt; i++) {
      finalStarsDiv.insertAdjacentHTML('afterbegin', finalStars[i].outerHTML);
    }
    finalMovesDiv.insertAdjacentHTML('afterbegin', finalMoves);
    finalTimeDiv.insertAdjacentHTML('afterbegin', finalTime);

    // pause timer
    clearInterval(timerStart);

    document.getElementById('modal-link').click();

  }

}



// replay button in congrats modal functionality
let replayButton = document.querySelector('#replayButton');
replayButton.addEventListener('click', restartGame);

// // click the modal close button, then click the restart button to prevent having to reload the page
function restartGame() {
  document.querySelector('.modal-close').click();
  document.querySelector('.restart-link').click();
}