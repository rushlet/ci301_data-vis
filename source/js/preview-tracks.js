import $ from 'jquery';
import config from './config.js'
export default function playableTrack () {
  console.log(config["user_top_tracks"]);
  $.getJSON( "./assets/data/fixed_data_for_analysis.json", function( data ) {
    console.log(data);
  });
}
