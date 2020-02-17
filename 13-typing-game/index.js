const settingBtn = document.getElementById('setting-btn');
const settingEl = document.getElementById('setting');
const settingForm = document.getElementById('setting-form');
const difficultySelect = document.getElementById('difficulty');
const wordEl = document.getElementById('word');
const text = document.getElementById('text');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const endGameContainer = document.getElementById('end-game-container');

let randomWord = '';

let time = 15;

let score = 0;

let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// focus on the text input automatically
text.focus();

// start the countdown
const timeInterval = setInterval(updateTime, 1000);

async function getRandomWord() {
  const res = await fetch('https://random-word-api.herokuapp.com/word?key=A9OVMFYZ&number=1')
  const data = await res.json();

  return data[0];
}

async function addWordToDOM() {
  randomWord = await getRandomWord();

  // for different difficulties the word's length is different

  // while(randomWord.length > 6 && difficulty === 'easy') {
  //   randomWord = await getRandomWord();
  // }
  //
  // while((randomWord.length > 10 || randomWord.length < 6) && difficulty === 'medium') {
  //   randomWord = await getRandomWord();
  // }
  //
  // while(randomWord.length < 10 && difficulty === 'hard') {
  //   randomWord = await getRandomWord();
  // }

  wordEl.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerText = score;
}

function updateTime() {
  time --;
  timeEl.innerHTML = `${ time }s`;

  if(time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}

function gameOver() {
  endGameContainer.innerHTML = `
    <h1>Time ran out!</h1>
    <p>Your final score is ${ score }</p>
    <button onclick="window.location.reload()">Reload</button>
  `;

  endGameContainer.style.display = 'flex';
}

addWordToDOM();

// event listener
text.addEventListener('input', e => {
  if(e.target.value === randomWord) {
    addWordToDOM();
    updateScore();

    // clear the input
    e.target.value = '';

    if(difficulty === 'hard') {
      time += 2;
    } else if(difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

  }
});

settingBtn.addEventListener('click', () => settingEl.classList.toggle('hide'));

settingForm.addEventListener('change', (e) => {
  difficulty = e.target.value;

  localStorage.setItem('difficulty', difficulty);
});
