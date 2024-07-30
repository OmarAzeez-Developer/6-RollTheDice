// acivate strict mode
'use strict';

// we used (#) instead of (.) because (score--0) is an (id) not (class)
const score0El = document.querySelector("#score--0");

// also you can call an (id) only and it does NOT work with (class) in the code line below
// no need for (#)
const score1El = document.getElementById("score--1");

// new button
const btnNew = document.querySelector(".btn--new");
// roll button
const btnRoll = document.querySelector(".btn--roll");
// hold button
const btnHold = document.querySelector(".btn--hold");

// dice element
const diceEl = document.querySelector(".dice");

// player 0 score
const current0El = document.querySelector("#current--0");

// player 1 score
const current1El = document.querySelector("#current--1");

// players active class for background color
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let scores, currentScore, activePlayer, stillPlaying;

const resetValuesFunction = function () {

    // starting conditions, set to 0
    score0El.textContent =0;
    score1El.textContent =0;
    // starting conditions, hide dice
    diceEl.classList.add("hidden");

    // array of scores for both players
     scores = [0, 0];

    // current score holder
     currentScore = 0;

    // active player holder
     activePlayer = 0;

    // still playing variable set to true
     stillPlaying = true
    
    // reset to 0
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    // remove dark background from winner
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    // add player (0) to be active player
    player0El.classList.add("player--active");
    // remove active player (1)
    player1El.classList.remove("player--active");
}

// call (resetValuesFunction) function when you first load the game 
resetValuesFunction();

const switchPlayer = function() {
    // reset score of current player(looser) to 0 before switching to other player
    document.querySelector(`#current--${activePlayer}`).textContent = 0;

    // ternary operator
    activePlayer = activePlayer === 0 ? 1 : 0;
    
    // reset current score to 0
    currentScore = 0;

    // add class(player--active) if it is not there and remove it if it is there for player (0) and player(1)
    // toggling on both players at same time  will ensure it is active only on one player because we had
    // (player--active) class only one one player
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

// roll the dice
btnRoll.addEventListener("click", function() {
    if (stillPlaying) {
    // generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // remove the hidden class from dice
    diceEl.classList.remove("hidden");

    // display the dice that matches the random dice roll
    diceEl.src = `dice-${dice}.png`;

    // check rolled dice for 1: if true, 
    if(dice !== 1) {
        // add dice score to current score
        currentScore  += dice;
        
        // display current score based on who is playing(current player) which either player(0) or player(1)
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore; 

        // display player 0 score
        // current0El.textContent = currentScore;  // change later to display current score for current player

    // switch to other player because dice rolled 1
    } else {
        // calling switchPlayer function
        switchPlayer();
        
    }
    }
});

// hold the score
btnHold.addEventListener("click", function() {
    if(stillPlaying) {
    // add current score to active player's score which is stored in (scores) array
    // scores[1] = scores[1] + currentScore
    scores[activePlayer] += currentScore; 

    // diplay current(hold) score 
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // check if player's score is > 100
    if (scores[activePlayer] >= 100) {
        // finish the game, set stillPlaying to false
        stillPlaying = false;
        // call (player--winner) class
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");

        // hide the dice
        diceEl.classList.add("hidden");

        // remove active player
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    } else {
        // switch to other player
        // calling switchPlayer function
        switchPlayer();
    }
    }
});

// pass the value NOT the function
btnNew.addEventListener("click", resetValuesFunction);
// btnNew.addEventListener("click", function() {
//     // call function
//     resetValuesFunction();
// });

