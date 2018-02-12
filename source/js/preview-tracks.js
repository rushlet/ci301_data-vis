import config from './config.js';

export default function addTrackPreviewListeners() {
  let playableTracks = document.querySelectorAll('.playable-track');
  let allTracks = config.dataset;
  config['songPlaying'] = false;
  config['currentSong'] = null;
  playableTracks.forEach((track) => {
    let trackID = track.dataset.id;
    let trackURL = "";
    console.log(track.dataset.id);
    allTracks.forEach((entry) => {
      if (entry['spotify_id'] === trackID) {
        track.setAttribute("data-url", entry['preview_url']);
      }
    })
    track.addEventListener("click", playTrack, false);
  });
}

function playTrack () {
  let clickedSong = new Audio(this.dataset.url);
  let clickedSongElement = this;
  const playIcon = './assets/img/sound_on.svg';
  const pauseIcon = './assets/img/sound_off.svg';
  if (config['currentSong'] !== null) {
    var previousSong = config['currentSong'];
    previousSong.pause();
    document.querySelector(`[data-url='${previousSong.getAttribute('src')}']`).style.backgroundImage = `url(${playIcon})`;
    config['currentSong'] = clickedSong;
    if (!config['songPlaying']) {
      playSong(clickedSong, clickedSongElement, pauseIcon);
    } else {
      if (clickedSong.getAttribute('src') === previousSong.getAttribute('src')) {
        pauseSong(clickedSong, clickedSongElement, playIcon);
      } else {
        playSong(clickedSong, clickedSongElement, pauseIcon);
      }
    }
  } else {
    config['currentSong'] = clickedSong;
    playSong(clickedSong, clickedSongElement, pauseIcon);
  }
}

function pauseSong(song, songElement, playIcon) {
  song.pause();
  config['songPlaying'] = false;
  songElement.style.backgroundImage = `url(${playIcon})`;
}

function playSong(song, songElement, pauseIcon) {
  song.play();
  config['songPlaying'] = true;
  songElement.style.backgroundImage = `url(${pauseIcon})`;
}
