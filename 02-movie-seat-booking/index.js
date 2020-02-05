const movieSelect = document.getElementById('movie');
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
let moviePrice = +movieSelect.value;

setUI();
updateCount();

// function
function setMovieData(selectedMovieIndex, selectedMoviePrice) {
}

function updateCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));

  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * moviePrice;
}

// get the localstorage data and set the ui
function setUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

  if(selectedSeats && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    })
  }

  if(selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  if(selectedMoviePrice) {
    moviePrice = +selectedMoviePrice;
  }
}

// event listener
movieSelect.addEventListener('change', e => {
  moviePrice = +e.target.value;

  localStorage.setItem('selectedMovieIndex', movieSelect.selectedIndex);
  localStorage.setItem('selectedMoviePrice', e.target.value);

  updateCount();
});

container.addEventListener('click', e => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateCount();
  }
});
