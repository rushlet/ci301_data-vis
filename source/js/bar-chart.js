import * as d3 from "d3";
import config from './config.js';
import * as dataCleaner from './data-cleaner.js';

class BarChart {
  constructor() {
    const songOneInput = document.getElementById('personalisation-input--song1');
    const songTwoInput = document.getElementById('personalisation-input--song2');
    let songOneTracks = config["dataset"];
    const songTwoTracks = config["dataset"];
    if (Object.keys(config["user_top_tracks"]).length > 0) {
      songOneTracks = config["user_top_tracks"];
    }
    this.populateDropdown(songOneTracks, songOneInput);
    this.populateDropdown(songTwoTracks, songTwoInput);
    let barChart = this;
    songOneInput.addEventListener("change", () => {
      barChart.songSelected(songOneTracks, songOneInput);
    });
    songTwoInput.addEventListener("change", () => {
      barChart.songSelected(songTwoTracks, songTwoInput);
    });
  }

  populateDropdown(dataset, dropdown) {
    let tracks = Object.keys(dataset);
    tracks.forEach((track)=> {
      const currentTrack = dataset[track];
      let opt = document.createElement("option");
      opt.textContent = `${dataCleaner.capitalize((currentTrack.title).toString())} - ${dataCleaner.capitalize((currentTrack.artist).toString())}`;
      opt.value = currentTrack.spotify_id;
      dropdown.appendChild(opt);
    })
  }

  songSelected(dataset, dropdown) {
    console.log('song selected', dropdown.id);
    console.log(dropdown.value);
    let selectedTrack;
    let tracks = Object.keys(dataset);
    tracks.forEach((track)=> {
      let currentTrack = dataset[track];
      if (currentTrack.spotify_id === dropdown.value) {
        selectedTrack = currentTrack;
      }
    });
    console.log(selectedTrack);

    let currentInput = dropdown.id.substr(dropdown.id.length - 1);
    let currentTextSpan = document.querySelector(`.personalisation-subtitle--song${currentInput}`);
    currentTextSpan.innerHTML = dataCleaner.capitalize((selectedTrack.title).toString());
  }
}

export default BarChart;
