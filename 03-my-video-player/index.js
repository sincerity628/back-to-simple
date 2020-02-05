const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// function
function toggleVideoStatus() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function changePlayIcon() {
  if(video.paused) {
    play.innerHTML = '<i class="fa fa-play"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause"></i>';
  }
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  let min = Math.floor(video.currentTime / 60);
  if(min < 10) {
    min = '0' + String(min);
  }

  let sec = Math.floor(video.currentTime % 60);
  if(sec < 10) {
    sec = '0' + String(sec);
  } else {
    sec = String(sec);
  }

  timestamp.innerText = `${min}:${sec}`;
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

function setVideoProgress() {
  video.currentTime = (+progress.value / 100) * video.duration;
}

// event listener
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', changePlayIcon);
video.addEventListener('play', changePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);
