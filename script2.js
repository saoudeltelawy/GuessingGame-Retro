// 2nd Version - [DRY] Code

'use strict';
// Variables
// const secretNumber = Math.trunc(Math.random() * 20) + 1; // Generate a random number between 1 and 20
let score = 20;
const scoreElement = document.querySelector('.score');
const boxNumber = document.querySelector('.number'); // The element that displays the secret number
const checkBtn = document.querySelector('.check');
const guessInput = document.querySelector('.guess');
const againBtn = document.querySelector('.again');
const messageElement = document.querySelector('.message');
let secretNumber;

// Set initial values
scoreElement.textContent = score;
secretNumber = getSecretNumber();
// boxNumber.textContent = secretNumber;
console.log(`The secret number is ${secretNumber}`);

checkBtn.addEventListener('click', function () {
  const guess = Number(guessInput.value); //Get input Value & make it number for compare with secret#
  console.log(guess, typeof guess);
  // Check firstly if the guessInput has value or not! (VIP)
  if (!guess) {
    setMessage('⛔️ There is No guessed Number!');
  } else if (guess === secretNumber) {
    setMessage('🎉 Correct Number!');
    // document.querySelector('body').style.backgroundColor = '#213e19';
    updateStyle('#213e19');
    // document.querySelector('.number').style.width = '30rem';
    updateStyle('#213e19', '30rem');
    boxNumber.textContent = secretNumber;
    // Disbaling the Game
    guessInput.disabled = true;
  }
  // Check if the guess is too high
  else if (guess > secretNumber) {
    if (score > 1) {
      setMessage('📈 Too high!');
      updateScore();
    } else {
      setMessage('💥 You lost the game!');
      scoreElement.textContent = 0;
    }
  }
  // Check if the guess is too low
  else if (guess < secretNumber) {
    if (score > 1) {
      setMessage('📉 Too low!');
      updateScore();
    } else {
      setMessage('💥 You lost the game!');
      scoreElement.textContent = 0;
    }
  }
});

// Game Reset - Again:
againBtn.addEventListener('click', gameReset);

// Functions

function setMessage(message) {
  messageElement.textContent = message;
}

function updateScore() {
  score--;
  scoreElement.textContent = score;
}

// Function to update styles [Body & Number box]
function updateStyle(color, width) {
  document.querySelector('body').style.backgroundColor = color;
  boxNumber.style.width = width;
}

function getSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function gameReset() {
  secretNumber = getSecretNumber();
  score = 20;
  scoreElement.textContent = score;
  setMessage('Start guessing...');
  updateStyle('#222', '15rem');
  guessInput.value = '';
  console.log(`The secret number is ${secretNumber}`);
  boxNumber.textContent = '?';
  // Re-enabling the Game
  guessInput.disabled = false;
}
