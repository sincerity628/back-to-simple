const musicContainer = document.getElementById('music-container');
const  progressContainer = document.getElementById('progress-container');
const  progress = document.getElementById('progress');
const  title = document.getElementById('title');
const  audio = document.getElementById('audio');
const  cover = document.getElementById('cover');
const  prevBtn = document.getElementById('prev');
const  playBtn = document.getElementById('play');
const  nextBtn = document.getElementById('next');

const titles = ['좋은 일', '赶路', 'Crumbs', 'Dont Break Your Heart'];
const songs = ['good-thing', 'road', 'crumbs', 'heart'];

let songIndex = 0;

// initially load the song to the DOM
loadSong(songIndex);

// function
function loadSong(index) {
  title.innerText = titles[index];
  audio.src = `./music/${songs[index]}.mp3`;
  cover.src = `./images/${songs[index]}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');

  playBtn.innerHTML = '<i class="fas fa-pause"></i>';

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');

  playBtn.innerHTML = '<i class="fas fa-play"></i>';

  audio.pause();
}

// play the previuos song
function prevSong() {
  songIndex--;
  if(songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songIndex);
  playSong();
}

// play the next song
function nextSong() {
  songIndex++;
  if(songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songIndex);
  playSong();
}

// update the progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = ( currentTime / duration ) * 100;

  progress.style.width = `${progressPercent}%`;
}

// set the progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = duration * (clickX / width);
}

// event listener
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if(isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);
