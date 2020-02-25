const msgEl = document.getElementById('msg');

const randomNumber = getRandomNumber();
// console.log("Number:", randomNumber);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition()

// start the game
recognition.start();

// function

// generate a random number between 1 - 100
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// capture user speak
function onSpeak(e) {
  console.log(e);
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// set the message to DOM
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box">${ msg }</span>
  `;
}

// check the number
function checkNumber(msg) {
  const number = +msg;

  // check if is number
  // Number.is not a number
  if(Number.isNaN(number)) {
    msgEl.innerHTML += '<div>That is not a valid number.</div>';
    return;
  }

  // check the range
  if(number > 100 || number < 0) {
    msgEl.innerHTML += '<div>The number must between 1 - 100.</div>';
    return;
  }

  // check number
  if(number === randomNumber) {
    document.body.innerHTML = `
      <div>
        <h2>Congratulations! You've guessed the number!</h2>
        <br />
        <br />
        <p>the number is: ${ number }</p>
        <button
          id="play-again-btn"
          class="play-again-btn"
        >Play Again</button>
      </div>
    `;
  } else if(number > randomNumber) {
    msgEl.innerHTML += '<div>GO LOWER</div>';
  } else {
    msgEl.innerHTML += '<div>GO HIGHER</div>';
  }
}

// event listener
recognition.addEventListener('result', onSpeak);

// restart the speech recognition
recognition.addEventListener('end', () => recognition.start());

// play again button click listener
document.body.addEventListener('click', e => {
  if(e.target.id !== 'play-again-btn') return;

  window.location.reload();
});
