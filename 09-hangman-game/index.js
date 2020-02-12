const figureParts = document.querySelectorAll('.figure-part');
const wrongLettersEl = document.getElementById('wrong-letters');
const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playBtn = document.getElementById('play-button');
const notification = document.getElementById('notification-container');

const words = [
  'program', 'javascript', 'apple',
  'code', 'computer', 'book', 'school',
  'beautiful', 'cool', 'love', 'heart',
  'eye'
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters =  [];

displayWord();

function displayWord() {
  wordEl.innerHTML = `
    ${ selectedWord
      .split('')
      .map(letter => `
        <div class="letter">${ correctLetters.includes(letter) ? letter : '' }</div>
      `
      )
      .join('')
    }
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');
  // check if won
  if(innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 🎇😁';
    popup.style.display = 'flex';
  }
}

function updateWrongLetters() {
  // display wrong letters
  wrongLettersEl.innerHTML = `
    ${ wrongLetters.length ? '<p>Wrong</p>' : '' }
    ${ wrongLetters.map(letter => `<span>${ letter }</span>`) }
  `;

  // display figure parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if(index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // check if lost
  if(wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately! You lost! 😕';

    popup.style.display = 'flex';
  }
}

function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// event listener
playBtn.addEventListener('click', () => {
  // clear array
  correctLetters.splice(0);
  wrongLetters.splice(0);
  // get a new random word
  selectedWord = words[Math.floor(Math.random() * words.length)];

  // update
  displayWord();
  updateWrongLetters();

  // close the popup
  popup.style.display = 'none';
});

window.addEventListener('keydown', e => {
  // filter
  if(e.keyCode < 65 || e.keCode > 90) return;

  const letter = e.key;
  if(selectedWord.includes(letter)) {
    if(!correctLetters.includes(letter)) {
      correctLetters.push(letter);

      displayWord();
    } else {
      showNotification();
    }
  } else {
    if(!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);

      updateWrongLetters();
    } else {
      showNotification();
    }
  }
});
