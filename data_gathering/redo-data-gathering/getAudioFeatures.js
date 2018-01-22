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

var failedTracks = require('./failed.json')
spotifyApi.setAccessToken('BQCF5jeuMjG7tAkEmC2kuMkNE1OvWMIrvheSTVnBfIpFbJNnqijPykg-Eul8ifDFJP3bFlf4AfnGbCUl8ULKrOt99hjxzK45V_natnf8EFooCRI97Hn2D5LMFfzUeHplwumRRDLmWmHKvhRvWMInzf8pXs_OPkHkVcXEl0uBIAwxOhYR39OfQxl_0jY');

failedTracks.forEach((track)=>{
  setTimeout(function () {
    let audioFeatures = [];
    if (track.id !== "not available on spotify") {
      spotifyApi.getAudioFeaturesForTrack(track.spotify_id)
      .then(function(data) {
        console.log(`got audio features for ${track.title}`);
        for (var key in data.body) {
          track[key] = data.body[key];
        }
        writeOutOutput();
      }, function(err) {
        console.log('Something went wrong!', track.title, err);
        failed.push(track);
        writeOutFailures();
      });
    }
  }, 2000);
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
