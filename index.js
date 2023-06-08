'use strict';

//   Elemets selection
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score1 = document.getElementById('score--0');
const score2 = document.getElementById('score--1');
const current1 = document.getElementById('current--0');
const current2 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//   Game initial conditions
score1.textContent = 0;
score2.textContent = 0;
dice.classList.add('hidden');

let currentScore = 0;
const totalScores = [0, 0];
let activePlayer = 0;
let isPlaying = true;

//   Roll dice
function changePlayer () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
};

const rollFunc = function() {
    if (isPlaying) {
        //   Generate random number
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        //   Display number on dice
        dice.classList.remove('hidden');
        dice.src = `./assets/dice${diceNumber}.png`;
        //   If number = 1, switch player
        if (diceNumber !== 1) {
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            changePlayer ();
        }
    }
};

btnRoll.addEventListener('click', rollFunc);

//   Save score

const saveCurrentScore = function () {
    if (isPlaying) {
        //   Add current score to active player score
        totalScores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];
        //   If total score >= 100 - player won, if not - switch player
        if (totalScores[activePlayer] >= 100) {
            isPlaying = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            dice.classList.add('hidden');
        }  
        else {
            changePlayer();
        }
    }
};

btnHold.addEventListener('click', saveCurrentScore);


//   New game / restart game
const startNewGame = function () {
    isPlaying = true;
    //   Reset score
    totalScores[0] = 0;
    totalScores[1] = 0;
    document.getElementById('score--0').textContent = totalScores[0];
    document.getElementById('score--1').textContent = totalScores[1];

    //   Reset current score
    currentScore = 0;

    //   Hidden dice
    dice.classList.add('hidden');

    //   Add first player default
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = 0;
    player1.classList.remove('player--active');
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
}


btnNew.addEventListener('click', startNewGame);