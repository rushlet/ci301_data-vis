import config from './config.js';
import * as dataCleaner from './data-cleaner.js';
import BarChart from './bar-chart.js';
import selectize from './libs/selectize.js';
import $ from 'jquery';

class Personalisation {
  constructor() {
    this.barChart = new BarChart();
    const songOneInput = document.getElementById('personalisation-input--song1');
    const songTwoInput = document.getElementById('personalisation-input--song2');
    const featureInput = document.getElementById('personalisation-input--feature');
    let songOneTracks = config["dataset"];
    const songTwoTracks = config["dataset"];
    if (Object.keys(config["user_top_tracks"]).length > 0) {
      songOneTracks = config["user_top_tracks"];
    }
    this.populateDropdown(songOneTracks, songOneInput);
    this.populateDropdown(songTwoTracks, songTwoInput);
    this.populateFeatureDropdown(config["features"], featureInput);
    let personalisation = this;
    $(songOneInput).selectize({
      create: false,
      sortField: 'text',
      onChange: ()=>{
        personalisation.songSelected(songOneTracks, songOneInput);
      }
    });
    $(songTwoInput).selectize({
      create: false,
      sortField: 'text',
      onChange: ()=>{
        personalisation.songSelected(songTwoTracks, songTwoInput);
      }
    });
    $(featureInput).selectize({
      create: false,
      sortField: 'text',
      onChange: ()=>{
        personalisation.selectFeature(featureInput);
      }
    });
    $("#personalisation-input").submit(function(e) {
      e.preventDefault();
    });
    document.getElementById('personalisation-input--submit').addEventListener('click', () => {
      console.log("click");
      this.barChart.removeBars();
      this.barChart.drawBars();
      document.getElementsByClassName('personalisation-subtitle')[0].innerHTML =
      `The graph below shows a comparison of
      <span>${dataCleaner.capitalize((config['personalisation-song1'].title).toString())}</span>
      with <span>${dataCleaner.capitalize((config['personalisation-song2'].title).toString())}</span>
      by <span>${config['personalisation-feature']}</span>`;
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

  searchForSong(idNumber) {
    var input=document.getElementById(`personalisation-search--song${idNumber}`).value.toLowerCase();
    var output=document.getElementById(`personalisation-input--song${idNumber}`).options;
    for(var i=0; i<output.length; i++) {
      if(output[i].value.indexOf(input)==0){
        output[i].selected=true;
      }
      if(document.getElementById(`personalisation-input--song${idNumber}`).value==''){
        output[0].selected=true;
      }
    }
  }

  songSelected(dataset, dropdown) {
    let selectedTrack;
    let tracks = Object.keys(dataset);
    tracks.forEach((track)=> {
      let currentTrack = dataset[track];
      if (currentTrack.spotify_id === dropdown.value) {
        selectedTrack = currentTrack;
      }
    });
    let currentInputId = dropdown.id.substr(dropdown.id.length - 1);
    let currentTextSpan = document.querySelector(`.personalisation-subtitle--song${currentInputId}`);
    config[`personalisation-song${currentInputId}`] = selectedTrack;
  }

  selectFeature(dropdown) {
    config['personalisation-feature'] = dropdown.value.toLowerCase();
  }

  populateFeatureDropdown(dataset, dropdown) {
    let features = config["features"];
    features.forEach((feature)=>{
      let opt = document.createElement("option");
      opt.textContent = feature;
      opt.value = feature;
      dropdown.appendChild(opt);
    });
  }

  addTextNextToSelectize() {
    let inputs = document.querySelectorAll('.selectize-input');
    // add labels to inputs
    // if using spotify data label might be different for 1st input
  }
}

export default Personalisation;
