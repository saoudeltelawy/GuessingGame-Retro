// Updated JS code - Refactoring the Code [DRY principles]

"use strict";
// Variables
let score = 20;
let highScore = 0;
let secretNumber;

const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".highscore");
const boxNumber = document.querySelector(".number"); // The element that displays the secret number
const checkBtn = document.querySelector(".check");
const guessInput = document.querySelector(".guess");
const againBtn = document.querySelector(".again");
const messageElement = document.querySelector(".message");

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
  const bodyElement = document.querySelector("body");
  bodyElement.style.backgroundColor = color;
  boxNumber.style.width = width;
}

function getSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function gameReset() {
  secretNumber = getSecretNumber();
  score = 20;
  scoreElement.textContent = score;
  setMessage("Start guessing...");
  updateStyle("#222", "15rem");
  guessInput.value = "";
  console.log(`The secret number is ${secretNumber}`);
  boxNumber.textContent = "?";
  // Re-enabling the Game
  guessInput.disabled = false;
}

// Initialize secret number & set initial values
scoreElement.textContent = score;
secretNumber = getSecretNumber();
// boxNumber.textContent = secretNumber;
// console.log(`The secret number is ${secretNumber}`);

// Handle check button click
checkBtn.addEventListener("click", function () {
  const guess = Number(guessInput.value); //Get input Value & make it number for compare with secret#
  // console.log(guess, typeof guess);
  // Check for empty input (VIP)
  if (!guess) {
    setMessage("⛔️ There is No guessed Number!");
  } else if (guess === secretNumber) {
    setMessage("🎉 Correct Number!");
    // document.querySelector('body').style.backgroundColor = '#213e19';
    updateStyle("#213e19");
    // document.querySelector('.number').style.width = '30rem';
    updateStyle("#213e19", "30rem");
    boxNumber.textContent = secretNumber;
    // Disabling the Game
    guessInput.disabled = true;
    // Set the highScore
    if (score > highScore) {
      highScore = score;
      highScoreElement.textContent = highScore;
    }
  }
  // Handle incorrect guesses:
  else if (guess !== secretNumber) {
    const feedback = guess > secretNumber ? "📈 Too high!" : "📉 Too low!";
    if (score > 1) {
      setMessage(feedback);
      updateScore();
    } else {
      setMessage("💥 You lost the game!");
      scoreElement.textContent = 0;
    }
  }
});

// Handle again button click (Again)
againBtn.addEventListener("click", gameReset);
