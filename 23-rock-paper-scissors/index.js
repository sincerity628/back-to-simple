const modal = document.getElementById('modal');
const restartBtn = document.getElementById('restart');
const scoreEl = document.getElementById('score');
const resultEl = document.getElementById('result');
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');

// data
// the choices
let userChoice;
let computerChoice;
// the scores
let userScore = 0;
let computerScore = 0;
// the 3 types of result
const result = ['rock', 'paper', 'scissors'];

// function
function startGame(choice) {
  // show Btn
  restartBtn.style.display = 'inline-block';

  // user made choice
  userChoice = choice;

  // compuer made the choice
  computerChoice = computerChoose();

  // check the winner
  const winner = checkWinner();

  console.log(winner);
}

// computer choose
function computerChoose() {
  return result[Math.floor(Math.random() * result.length)];
}

// check Winner
function checkWinner() {
  console.log(userChoice, computerChoice);

  return 'nobody';
}

// event listeners
rock.addEventListener('click', () => startGame('rock'));
paper.addEventListener('click', () => startGame('paper'));
scissors.addEventListener('click', () => startGame('scissors'));
