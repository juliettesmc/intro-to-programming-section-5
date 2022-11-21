const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("num-of-guesses");
const correctMessage = document.getElementById("correct");

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  console.log(attempts);
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;
  // if (attempts === maxNumberOfAttempts) {
  //   submitButton.disabled = true;
  //   guessInput.disabled = true;
  // }

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "block";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = "block";

    submitButton.disabled = false;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = "block";
    } else {
      tooLowMessage.style.display = "none";
    }
    if (guess > targetNumber) {
      tooHighMessage.style.display = "block";
    } else {
      tooHighMessage.style.display = "none";
    }

    let remainingAttempts = maxNumberOfAttempts - attempts;
    //console.log(remainingAttempts);

    numberOfGuessesMessage.style.display = " ";
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    maxGuessesMessage.style.display = "block";
    resetButton.style.display = "block";
  }
  // guessInput.value = " ";

  resetButton.style.display = "block";
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = "none";
  }
}

function setup() {
  // console.log("setup is working");
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  maxNumberOfAttempts = 5;

  // Enable the input and submit button
  submitButton.disabeld = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = "none";
  submitButton.disabled = false;
  attempts = 0;
}

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
