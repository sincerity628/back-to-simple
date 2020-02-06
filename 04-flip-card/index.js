// the buttons
const addBtn = document.getElementById('add');
const showBtn = document.getElementById('show');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const hideBtn = document.getElementById('hide');
const clearBtn = document.getElementById('clear');

// the elements
const answerEl = document.getElementById('answer');
const currentEl = document.getElementById('current');
const questionEl = document.getElementById('question');

// the containers
const addContainer = document.getElementById('add-container');
const cardContainer = document.getElementById('cards-container');

let defaultCardData = [
  { question: 'What is JavaScript?', answer: 'A programming language.' },
  { question: 'What is ReactJS?', answer: 'A front-end framework.' },
  { question: 'What is the result of "typeof(null)"?', answer: '"object"' }
];

// keep track of current active card
let currentActiveCard = 0;

// the actual card DOM array which will show in html
let cardDOM = [];

// the data of the existing cards
let cardData = getCardData();

// get the card data from local storage and set it to cardData
function getCardData() {
  const card = JSON.parse(localStorage.getItem('cardData'));
  return card ? card : defaultCardData;
}

function createAllCards() {
  cardData.forEach((data, index) => createCard(data, index));
}

// create one single card
function createCard(data, index) {
  let card = document.createElement('div');
  card.classList.add('card');

  if(index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${ data.question }</p>
      </div>
      <div class="inner-card-back">
        <p>${ data.answer }</p>
      </div>
    </div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  cardDOM.push(card);
  cardContainer.appendChild(card);
  updateNavigation();
}

function updateNavigation() {
  if(cardDOM.length === 0) {
    currentEl.innerText = '0 / 0';
  } else {
    currentEl.innerText = `${ currentActiveCard + 1 } / ${ cardDOM.length }`;
  }
}

function addCard() {
  let data = {
    question: questionEl.value,
    answer: answerEl.value
  };
  cardData.push(data);
  localStorage.setItem('cardData', JSON.stringify(cardData));
  createCard(data, cardData.length - 1);
}

function clearInput() {
  questionEl.value = '';
  answerEl.value = '';
}

function initData() {
  cardData = [];
  cardDOM = [];
  currentActiveCard = 0;
  cardContainer.innerHTML = '';
  updateNavigation();
}

createAllCards();

// event listener
showBtn.addEventListener('click', () => {
  addContainer.classList.toggle('show');
});

hideBtn.addEventListener('click', () => {
  addContainer.classList.toggle('show');
});

addBtn.addEventListener('click', () => {
  if(!questionEl.value || !answer.value) {
    return;
  }

  addCard();
  clearInput();

  addContainer.classList.toggle('show');
});

prevBtn.addEventListener('click', () => {
  cardDOM[currentActiveCard].className = 'card';

  currentActiveCard--;

  if(currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardDOM[currentActiveCard].className = 'card active';

  updateNavigation();
});

nextBtn.addEventListener('click', () => {
  cardDOM[currentActiveCard].className = 'card left';

  currentActiveCard++;

  if(currentActiveCard > cardDOM.length - 1) {
    currentActiveCard = cardDOM.length - 1;
  }

  cardDOM[currentActiveCard].className = 'card active';

  updateNavigation();
});

clearBtn.addEventListener('click', () => {
  initData();
  localStorage.removeItem('cardData');
});
