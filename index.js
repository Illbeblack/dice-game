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

//   Roll dice
const rollFunc = function() {
    //   Generate random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    //   Display number on dice
    dice.classList.remove('hidden');
    dice.src = `/assets/dice${diceNumber}.png`;
    //   If number = 1, switch player
    if (diceNumber !== 1) {
        currentScore += diceNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else {
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player1.classList.toggle('player--active');
        player2.classList.toggle('player--active');
    }
};

btnRoll.addEventListener('click', rollFunc);