import * as d3 from "d3";
import config from './config.js';

class BarChart {
  constructor() {
    console.log(config["user_top_tracks"]);
    if (Object.keys(config["user_top_tracks"]).length > 0) {
      console.log("yay");
      const tracks = Object.keys(config["user_top_tracks"]);
      const songOneInput = document.getElementById('personalisation-input--song1');
      tracks.forEach((track)=> {
        const currentTrack = config["user_top_tracks"][track];
        let opt = document.createElement("option");
        opt.textContent = `${currentTrack.name} - ${currentTrack.artist}`;
        opt.value = currentTrack.name;
        songOneInput.appendChild(opt);
      })
    } else {
      console.log("nay");
    }
  }
}

export default BarChart;
