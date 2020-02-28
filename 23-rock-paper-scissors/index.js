const modal = document.getElementById('modal');
const restartBtn = document.getElementById('restart');
const scoreEl = document.getElementById('score');
const resultEl = document.getElementById('result');
const choices = document.querySelectorAll('.choice');

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
function startGame(e) {
  // show Btn
  restartBtn.style.display = 'inline-block';

  // user made choice
  userChoice = e.target.id;

  // compuer made the choice
  computerChoice = computerChoose();

  // check the winner
  const winner = checkWinner();

  countScore(winner);
}

// computer choose
function computerChoose() {
  return result[Math.floor(Math.random() * result.length)];
}

// check Winner
function checkWinner() {
  // draw
  if(userChoice === computerChoice) {
    return 'nobody';
  }

  // user wins
  if(userChoice === 'rock' && computerChoice === 'scissors' ||
    userChoice === 'paper' && computerChoice === 'rock' ||
    userChoice === 'scissors' && computerChoice === 'paper'
  ) {
    return 'user';
  }

  // computer wins
  if(computerChoice === 'rock' && userChoice === 'scissors' ||
    computerChoice === 'paper' && userChoice === 'rock' ||
    computerChoice === 'scissors' && userChoice === 'paper'
  ) {
    return 'computer';
  }
}

// count the score
function countScore(winner) {
  if(winner === 'nobody') {
    resultEl.innerHTML = `
      <h2>Draw!</h2>
      <i class="fas fa-hand-${computerChoice} fa-9x"></i>
      <p>Computer chose ${ computerChoice }.</p>
    `;
    modal.style.display = 'flex';

  } else if(winner === 'user') {
    resultEl.innerHTML = `
      <h2 class="win-text">You Win!</h2>
      <i class="fas fa-hand-${computerChoice} fa-9x"></i>
      <p>Computer chose ${ computerChoice }.</p>
    `;
    modal.style.display = 'flex';

    userScore++;

    updateScore();
  } else {
    resultEl.innerHTML = `
      <h2 class="lose-text">You lose!</h2>
      <i class="fas fa-hand-${computerChoice} fa-9x"></i>
      <p>Computer chose ${ computerChoice }</p>
    `;
    modal.style.display = 'flex';

    computerScore++;

    updateScore();
  }
}

// close the modal
function closeModal(e) {
  if(e.target.id === 'modal') {
    modal.style.display = 'none';
  }
}

// update the score board in the DOM
function updateScore() {
  scoreEl.innerHTML = `
    <p>Player: ${ userScore }</p>
    <p>Computer: ${ computerScore }</p>
  `;
}

// event listeners
// user make the choice
choices.forEach(choice => choice.addEventListener('click', startGame));

// restart the game
restartBtn.addEventListener('click', () => window.location.reload());

// close the modal
document.addEventListener('click', closeModal);
