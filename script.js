let randomNumber = parseInt(Math.random() * 100 + 1);

const submitBtn = document.querySelector(`#submit`);
const useInput = document.querySelector(`#guessField`);
const guesSlot = document.querySelector(`.guesses`);
const remaining = document.querySelector(`.lastResult`);
const lowOrHi = document.querySelector(`.lowOrHi`);
const startOver = document.querySelector(`.resultParas`);

const p = document.createElement(`p`);

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
  submitBtn.addEventListener(`click`, function (e) {
    e.preventDefault();
    const guess = parseInt(useInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert(`Please enter a valid number`);
  } else if (guess < 1) {
    alert(`Please enter a number more than 1`);
  } else if (guess > 100) {
    alert(`Please enter a valid less than 100`);
  } else {
    prevGuess.push(guess);
    if (numGuess === 5) {
      displayGuess(guess);
      displayMessage(`Game Over! Number was ${randomNumber} 👇`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guesed it right!`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Number is too low!`);
  } else if (guess > randomNumber) {
    displayMessage(`Number is too high!`);
  }
}

function displayGuess(guess) {
  useInput.value = ``;
  guesSlot.innerHTML += `${guess}, `;
  numGuess++;
  remaining.innerHTML = ` ${5 - numGuess}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  useInput.value = ``;
  useInput.setAttribute(`disabled`, ``);
  p.classList.add(`button`);
  p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameBtn = document.querySelector(`#newGame`);
  newGameBtn.addEventListener(`click`, function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guesSlot.innerHTML = ``;
    remaining.innerHTML = ` ${5 - numGuess}`;
    useInput.removeAttribute(`disabled`);
    startOver.removeChild(p);
    lowOrHi.innerHTML = `Choose an excellent number 🙂`;
    playGame = true;
  });
}
