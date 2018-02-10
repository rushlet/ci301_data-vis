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
  var clickedSong = new Audio(this.dataset.url);
  var clickedSongIcon = this.getAttribute('background');
  console.log(this);
  var playIcon = './assets/img/sound_on.svg';
  var pauseIcon = './assets/img/sound_off.svg';
  if (config['currentSong'] !== null) {
    var previousSong = config['currentSong'];
    previousSong.pause();
    document.querySelector(`[data-url='${previousSong.getAttribute('src')}']`).style.backgroundImage = `url(${playIcon})`;
    config['currentSong'] = clickedSong;
    if (!config['songPlaying']) {
      clickedSong.play();
      this.style.backgroundImage = `url(${pauseIcon})`;
      config['songPlaying'] = true;
    } else {
      if (clickedSong.getAttribute('src') === previousSong.getAttribute('src')) {
        clickedSong.pause();
        config['songPlaying'] = false;
        this.style.backgroundImage = `url(${playIcon})`;
      } else {
        clickedSong.play();
        config['songPlaying'] = true;
        this.style.backgroundImage = `url(${pauseIcon})`;
      }
    }
  } else {
    clickedSong.play();
    config['currentSong'] = clickedSong;
    config['songPlaying'] = true;
    this.style.backgroundImage = `url(${pauseIcon})`;
  }
}
