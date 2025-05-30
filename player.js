let currentMusic = 0;

const music = document.querySelector("#music-player");

const progressBar = document.querySelector(".progress-bar");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const albumCover = document.querySelector(".album-cover");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".duration");

const playButton = document.querySelector(".play-button");
const pauseButton = playButton.querySelector("img");

const nextButton = document.querySelector(".next-button");
const prevButton = document.querySelector(".prev-button");
const volumeSlider = document.querySelector(".volume-slider");

let isPlaying = false;

playButton.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
  } else {
    music.play();
  }

  if (isPlaying) {
    pauseButton.src = "/assets/play.svg";
    pauseButton.alt = "Play";
  } else {
    pauseButton.src = "/assets/pause.svg";
    pauseButton.alt = "Pause";
  }

  isPlaying = !isPlaying;
});

const setMusic = (i) => {
  progressBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  albumCover.style.backgroundImage = `url(${song.cover})`;

  currentTime.innerHTML = "00:00";

  music.addEventListener("timeupdate", () => {
    progressBar.value = music.currentTime;
    currentTime.innerHTML = formaTime(music.currentTime);
  });

  music.addEventListener("loadedmetadata", () => {
    progressBar.max = music.duration;
    musicDuration.innerHTML = formaTime(music.duration);
  });


};

setMusic(0);

//formattung time in min and secs//

const formaTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }

  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

progressBar.addEventListener("input", () => {
  music.currentTime = progressBar.value;
});

const playMusic = () => {
  music.play();
  isPlaying = true;
  pauseButton.src = "/assets/pause.svg";
  pauseButton.alt = "Pause";
};

// Next and Previous buttons functionality//

nextButton.addEventListener("click", () => {
  currentMusic++;
  if (currentMusic >= songs.length) {
    currentMusic = 0;
  }
  setMusic(currentMusic);
  playMusic();
});

prevButton.addEventListener("click", () => {
  currentMusic--;
  if (currentMusic < 0) {
    currentMusic = songs.length - 1;
  }
  setMusic(currentMusic);
  playMusic();
});

// Volume control functionality//

volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value / 100;
});

// Auto play next song when current song ends//
music.addEventListener("ended", () => {
  nextMusic();
});

const nextMusic = () => {
  currentMusic = (currentMusic + 1) % songs.length;
  setMusic(currentMusic);
  music.play();
  isPlaying = true;
  pauseButton.src = "/assets/pause.svg";
  pauseButton.alt = "Pause";
};


