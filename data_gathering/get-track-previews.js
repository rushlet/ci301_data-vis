var SpotifyWebApi = require('spotify-web-api-node');
var writeJson = require('write-json');
var tracks = require('../source/assets/data/fixed_data_for_analysis.json');
var keys = require('./spotify_keys.json')
var client = keys["2"]["client"];
var secret = keys["2"]["secret"];
var outputFile = '../source/assets/data/fixed_data_for_analysis.json';
let output = {};
var failFile = './failed.json';
let failed = [];

var spotifyApi = new SpotifyWebApi({
  clientId : client,
  clientSecret : secret,
  redirectUri : 'http://localhost:8888/callback'
});
spotifyApi.setAccessToken('BQCF9mO5PWyTi0duoIOED9zT3kpj7QASCAlYYmlMJsgBi-G5lU4EvT6JGyFufHjAhKYqOwkqIRLVapGeQ44CyIOB2ZAoMp33iqj6cTsZZwxhntwJlWuVENMJYEO4FFfQ6lsk045cHmtHSGdpnHukfHuJK_itnz51HlDHGd1Ls_FoosdM1BVrI7WlHYs');

tracks.forEach((track) => {
  if (track.preview_url === undefined) {
    spotifyApi.getTrack(track.spotify_id)
      .then(function(data) {
        track['preview_url'] = data.body.preview_url;
        writeOutOutput();
      }, function(err) {
        console.log('Something went wrong!', err);
        failed.push([track.title, track.artist]);
        writeOutFailures();
    });
  }
});

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
