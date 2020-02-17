const settingBtn = document.getElementById('setting-btn');
const settingEl = document.getElementById('setting');
const settingForm = document.getElementById('setting-form');
const difficultySelect = document.getElementById('difficulty');
const wordEl = document.getElementById('word');
const text = document.getElementById('text');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const endGameContainer = document.getElementById('end-game-container');

const words = [
  "husking",
  "potiches",
  "ghostwritten",
  "bewailers",
  "gnarr",
  "impetrate",
  "rummiest",
  "chichiest",
  "myxomata",
  "acetylcholine",
  "anemometers",
  "jailed",
  "septupling",
  "lugworms",
  "disembowel",
  "staphylococcus",
  "turbidimetries",
  "seraph",
  "noodling",
  "referring",
  "respool",
  "phantasied",
  "reheeled",
  "characterizing",
  "raffishly",
  "lungworts",
  "fimbriae",
  "unimaginable",
  "speeds",
  "untied",
  "sinlessly",
  "waterski",
  "skewbald",
  "blobbing",
  "caesiums",
  "plots",
  "hejira",
  "gribble",
  "bribe",
  "shuteye",
  "reductor",
  "voltmeters",
  "naevoid",
  "muleteers",
  "sleave",
  "suckering",
  "puling",
  "ordure",
  "dopamine",
  "us",
  "subceiling",
  "limberer",
  "pawnshop",
  "dadaist",
  "ruralites",
  "lineable",
  "tutorage",
  "rerelease",
  "birthed",
  "catechins",
  "usurer",
  "slipware",
  "quadrivium",
  "nucleinic",
  "shutdowns",
  "myxomatoses",
  "louses",
  "quartettes",
  "myoclonuses",
  "pinball",
  "eutrophications",
  "nontransferable",
  "irrevocability",
  "gonorrhea",
  "mump",
  "pilocarpine",
  "persuasive",
  "metricates",
  "aerobatic",
  "potshards",
  "battling",
  "imperiousness",
  "stiff",
  "hamzahs",
  "car",
  "coerecting",
  "hirers",
  "natrolite",
  "fetching",
  "yokes",
  "saltire",
  "wardrobed",
  "algebraically",
  "slinking",
  "promotiveness",
  "pivoted",
  "shoats",
  "hanaper",
  "label",
  "microimages",
  "hakim",
  "theretofore",
  "pomfrets",
  "add",
  "addresser",
  "ratifier",
  "teacakes",
  "zeks",
  "sraddha",
  "antinepotism",
  "thermoclines",
  "outboast",
  "overblouse",
  "wissed",
  "sarments",
  "repoured",
  "viselike",
  "periscope",
  "bibliology",
  "sagiest",
  "caboched",
  "defendants",
  "passerines",
  "accuse",
  "reddishnesses",
  "creolised",
  "disreputability",
  "exercycle",
  "megadeath",
  "spectates",
  "defences",
  "cavitation",
  "meioses",
  "toponym",
  "cruelness",
  "mudholes",
  "unbelt",
  "swam",
  "semibreves",
  "headstream",
  "roofings",
  "superachievers",
  "peoples",
  "cheerier",
  "bakeshops",
  "evocative",
  "colorbreeding",
  "mocktails",
  "forwhy",
  "chowsing"
];

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

// async function getRandomWord() {
//   const res = await fetch('https://random-word-api.herokuapp.com/word?key=A9OVMFYZ&number=1')
//   const data = await res.json();
//
//   return data[0];
// }
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();

  // for different difficulties the word's length is different
  while(randomWord.length > 6 && difficulty === 'easy') {
    randomWord = getRandomWord();
  }

  while((randomWord.length > 10 || randomWord.length < 6) && difficulty === 'medium') {
    randomWord = getRandomWord();
  }

  while(randomWord.length < 10 && difficulty === 'hard') {
    randomWord = getRandomWord();
  }

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
