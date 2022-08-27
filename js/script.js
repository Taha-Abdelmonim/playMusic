let allMusic = [
  {
    name: "Harley Bird Home 1",
    artist: "Jordan Schor",
    img: "https://images.hdqwalls.com/download/doctor-strange-multiverse-of-madness-movie-4k-tx-1920x1080.jpg",
    src: "01",
  },
  {
    name: "Harley Bird Home 2",
    artist: "Jordan Schor",
    img: "https://i2.wp.com/imagess.cc/wp-content/uploads/2018/08/456-9.jpg",
    src: "02",
  },
  {
    name: "Harley Bird Home 3",
    artist: "Jordan Schor",
    img: "http://pm1.narvii.com/6737/3b0293920f1cb59556fc069841113c51b177b5d9v2_00.jpg",
    src: "03",
  },
];
const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector("img"),
  musicName = wrapper.querySelector(".name"),
  musicArtist = wrapper.querySelector(".artist"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  mainAudio = wrapper.querySelector("#main-audio"),
  progressArea = wrapper.querySelector(".progress-area"),
  progressBar = progressArea.querySelector(".progress-bar");

let musicIndex = Math.floor(Math.random() * allMusic.length + 1),
  isMusicPaused = true;
window.addEventListener("load", () => {
  loadMusic(musicIndex);
});
function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = allMusic[indexNumb - 1].img;
  mainAudio.src = `./assets/${allMusic[indexNumb - 1].src}.mp3`;
}

function playMusic() {
  wrapper.classList.add("paused");
  musicImg.classList.add("rotate");
  playPauseBtn.innerHTML = `<i class="fi fi-sr-pause "></i>`;
  mainAudio.play();
}
function pauseMusic() {
  wrapper.classList.remove("paused");
  musicImg.classList.remove("rotate");
  playPauseBtn.innerHTML = `<i class="fi fi-sr-play"></i>`;
  mainAudio.pause();
}
function prevMusic() {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  console.log(musicIndex);
}
function nextMusic() {
  musicIndex++;
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}
playPauseBtn.addEventListener("click", () => {
  const isMusicplay = wrapper.classList.contains("paused");
  isMusicplay ? pauseMusic() : playMusic();
});
prevBtn.addEventListener("click", () => {
  prevMusic();
});
nextBtn.addEventListener("click", () => {
  nextMusic();
});
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuration = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", () => {
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin} : ${totalSec}`;
  });
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin} : ${currentSec}`;
});
progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();
});
mainAudio.addEventListener("ended", (e) => {
  nextMusic();
});
