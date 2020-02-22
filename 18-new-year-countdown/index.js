const countdown = document.getElementById('countdown');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const yearEl = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${ currentYear + 1 } 00:00:00`);

// set the year to DOM
yearEl.innerText = currentYear + 1;

// function
function updateCountdown() {
  const nowTime = new Date();
  const diff = newYearTime - nowTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  days.innerHTML = d;
  hours.innerHTML = h < 10 ? `0${ h }` : h;
  minutes.innerHTML = m < 10 ? `0${ m }` : m;
  seconds.innerHTML = s < 10 ? `0${ s }` : s;
}

// remove the loading spinner & show the countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);

// run the countdown every second
setInterval(updateCountdown, 1000);
