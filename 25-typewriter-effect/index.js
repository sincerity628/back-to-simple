const TypeWriter = function(textElement, words, wait = 3000) {
  this.textElement = textElement;
  this.words = words;
  this.wait = parseInt(wait);
  this.text = '';
  this.wordIndex = 0;
  this.isDeleting = false;
  this.type();
};

// function
// the type effect function
TypeWriter.prototype.type = function() {
  // set the wordIndex
  this.wordIndex = this.wordIndex % this.words.length;
  // get the current typing word
  const fullWord = this.words[this.wordIndex];
  // get the current typing state word part
  if(!this.isDeleting) {
    this.text = fullWord.substring(0, this.text.length + 1);
  } else {
    this.text = fullWord.substring(0, this.text.length - 1);
  }

  // set the text to the DOM
  this.textElement.innerHTML = `<span class="text">${ this.text }</span>`;

  // set the different type speed
  let typeSpeed = 300;
  // check if is deleting mode
  if(this.isDeleting) {
    typeSpeed /= 2;
  }

  // check if the word is all typed
  if(!this.isDeleting && this.text === fullWord) {
    this.isDeleting = true;
    // wait for deleting
    typeSpeed = this.wait;
  } else if(this.isDeleting && this.text.length === 0) {
    this.isDeleting = false;
    this.wordIndex++;
    // wait for next words
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// init the typewriter
function init() {
  const textElement = document.querySelector('.text-type');
  const words = JSON.parse(textElement.getAttribute('data-words'));
  const wait = textElement.getAttribute('data-wait');

  new TypeWriter(textElement, words, wait);
};

// event listener
document.addEventListener('DOMContentLoaded', init);
