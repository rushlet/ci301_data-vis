import * as d3 from "d3";
import config from './config.js';

class BarChart {
  constructor() {
    const songOneInput = document.getElementById('personalisation-input--song1');
    const songTwoInput = document.getElementById('personalisation-input--song2');
    let tracks;
    if (Object.keys(config["user_top_tracks"]).length > 0) {
      tracks = Object.keys(config["user_top_tracks"]);
    } else {
      tracks = Object.keys(config["dataset"]);
    }
    this.populateDropdown(tracks, songOneInput, "user_top_tracks");
    this.populateDropdown(Object.keys(config["dataset"]), songTwoInput, "dataset");
  }

  populateDropdown(tracks, dropdown, dataset) {
    tracks.forEach((track)=> {
      const currentTrack = config[dataset][track];
      let opt = document.createElement("option");
      opt.textContent = `${currentTrack.title} - ${currentTrack.artist}`;
      opt.value = currentTrack.name;
      dropdown.appendChild(opt);
    })
  }
}

export default BarChart;
