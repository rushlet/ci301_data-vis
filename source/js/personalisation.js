import config from './config.js';
import * as dataCleaner from './data-cleaner.js';
import BarChart from './bar-chart.js';
import selectize from './libs/selectize.js';
import $ from 'jquery';

class Personalisation {
  constructor() {
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
    this.barChart = new BarChart();
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
    currentTextSpan.innerHTML = dataCleaner.capitalize((selectedTrack.title).toString());
    config[`personalisation-song${currentInputId}`] = selectedTrack;
  }

  selectFeature(dropdown) {
    config['personalisation-feature'] = dropdown.value.toLowerCase();
    this.barChart.removeBars();
    this.barChart.drawBars();
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
}

export default Personalisation;
