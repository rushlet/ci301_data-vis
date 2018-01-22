var SpotifyWebApi = require('spotify-web-api-node');
var writeJson = require('write-json');
var tracks = require('./compiledData.json')
var keys = require('../../data_gathering/spotify_keys.json')
var client = keys["2"]["client"];
var secret = keys["2"]["secret"];
var outputFile = './compiledData.json';
let output = {};
var failFile = './failed.json';
let failed = [];
let itemsProcessed = 0;
let count = 0;

var spotifyApi = new SpotifyWebApi({
  clientId : client,
  clientSecret : secret,
  redirectUri : 'http://localhost:8888/callback'
});

spotifyApi.setAccessToken('BQDVu5wkAv9_Hrtw-rAE7Z7eb7SOOvelqUpOoTm4l6qwSVQySa5HKjh_yCxMlEr5i782AthXzesbawXTC1IOYFl65MzQYNEwRJiRld3jkWa-2EatNSnnr2dRzam0b6fWd3Yl_hfYrh033Kch19SIqkZMov_Co6gvtkp3gsVzPalhxRiSuiZIIJ5Q4xQ&refresh_token=AQCmz5PrXgIHQjQoHbFLAK3Srzq9TUZeSNn-XG63yV1THn6cwtnKJrt_WOVSW4SNqUyYiKbWns2J_CET-aicMDs1Xin_GOm7nubMYC_SsShwPA7Q6KE6j8npY6vxv_91ALQ');

tracks.forEach((track)=>{
  if (!track.spotify_id || track.spotify_id === 'error') {
    console.log(track.title, track.artist);
    count++;
  }
  itemsProcessed++;
  if (itemsProcessed === tracks.length) {
    console.log(count);
  }
})


function writeOutOutput() {
  writeJson(outputFile, tracks, function(err) {
    if (err) {
      console.log('oops, error writing to file ', err);
    } else {
      console.log('data file made');
    }
  })
}

function writeOutFailures() {
  writeJson(failFile, failed, function(err) {
    if (err) {
      console.log('oops, error writing to file ', err);
    } else {
      console.log('fail file made');
    }
  })
}
