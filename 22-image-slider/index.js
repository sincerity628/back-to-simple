const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const slides = document.querySelectorAll('.slide');

// function
// switch to the previous slide
function prevSlide() {
  const current = document.querySelector('.current');
  current.classList.remove('current');

  if(current.previousElementSibling) {
    current.previousElementSibling.classList.add('current');
  } else {
    slides[slides.length - 1].classList.add('current');
  }
}

// swith to the next slide
function nextSlide() {
  const current = document.querySelector('.current');
  current.classList.remove('current');

  if(current.nextElementSibling) {
    current.nextElementSibling.classList.add('current');
  } else {
    slides[0].classList.add('current');
  }
}

// the interval time
const intervalTime = 5000;

// auto play the slides
let interval = setInterval(nextSlide, intervalTime);

// event listener
prevBtn.addEventListener('click', () => {
  prevSlide();

  clearInterval(interval);
  interval = setInterval(nextSlide, intervalTime);
});

nextBtn.addEventListener('click', () => {
  nextSlide();

  clearInterval(interval);
  interval = setInterval(nextSlide, intervalTime);
});
