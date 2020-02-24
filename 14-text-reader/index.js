const main = document.querySelector('main');
const textarea = document.getElementById('text');
const voicesSelect = document.getElementById('voices');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const readBtn = document.getElementById('read');

// the index images and texts
const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

// different voices
let voices = [];

// the speak text
const message = new SpeechSynthesisUtterance();

// add all the images & texts to the DOM
data.forEach(addBoxToDOM);

// function
// add one box to the DOM
function addBoxToDOM(item) {
  const { image, text } = item;
  const box = document.createElement('div');

  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="box-info">${ text }</p>
  `;

  box.addEventListener('click', () => {
    setText(text);
    speakText();

    // toggle the active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 1000);
  });

  main.appendChild(box);
}

// get the voices from the api and put them into select
function getVoices() {
  voices = window.speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${ voice.name } - ${ voice.lang }`;

    voicesSelect.appendChild(option);
  });
}

// set the speak text
function setText(text) {
  message.text = text;
}

// toggle speak
function speakText() {
  window.speechSynthesis.speak(message);
}

// set the voice of the speaker
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

getVoices();

// event listener
// toggle the text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// close the text box
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// choose different voices
voicesSelect.addEventListener('change', setVoice);

// read the text
readBtn.addEventListener('click', () => {
  setText(textarea.value);
  speakText();
});

// voices change
window.speechSynthesis.addEventListener('voiceschanged', getVoices);
