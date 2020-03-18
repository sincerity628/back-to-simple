// pause / play the video
function pauseVideo() {
  if(video.paused) {
    video.play();
    button.innerText = 'Pause';
  } else {
    video.pause();
    button.innerText = 'Play';
  }
}

button.addEventListener('click', pauseVideo);
