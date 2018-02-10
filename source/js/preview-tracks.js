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
  if (config['currentSong'] !== null) {
    var previousSong = config['currentSong'];
    previousSong.pause();
    config['currentSong'] = clickedSong;
    if (!config['songPlaying']) {
      clickedSong.play();
      config['songPlaying'] = true;
    } else {
      if (clickedSong.getAttribute('src') === previousSong.getAttribute('src')) {
        clickedSong.pause();
        config['songPlaying'] = false;
      } else {
        clickedSong.play();
        config['songPlaying'] = true;
      }
    }
  } else {
    clickedSong.play();
    config['currentSong'] = clickedSong;
    config['songPlaying'] = true;
  }
}
