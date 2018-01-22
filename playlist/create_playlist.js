var SpotifyWebApi = require('spotify-web-api-node');
var writeJson = require('write-json');
var keys = require('../data_gathering/spotify_keys.json')
var tracks = require('../data_gathering/redo-data-gathering/compiledData.json')
var client = keys["2"]["client"];
var secret = keys["2"]["secret"];
var outputFile = './failed.json';
let output = {};
let failed = [];
let itemsProcessed = 0;
let id = 0;

let failedTracks = require('./failed.json')
console.log(failedTracks.length);

var spotifyApi = new SpotifyWebApi({
  clientId : client,
  clientSecret : secret,
  redirectUri : 'http://localhost:8888/callback'
});

spotifyApi.setAccessToken('BQD3gKWwZgdEdJ7dyClKmrQMyPJ8BGC8fxQIpgMj3IA8VUv2bYDYmyIgfa3v80ZH-SipSmprygkgcHCNU-g9L9UiF57de5TixuFQ1Fnuy7UV_nv0UdBtqAhk6cDPf4dZOBb39526Sn9YJV_doXmGEktxMHn9ihlBppRkUmZqimnult0X_-_KIC0Z72A');

failedTracks.forEach((track)=>{
  spotifyApi.addTracksToPlaylist('rushlet', '6DNZV1L405XpElhIAUHaKZ', [`spotify:track:${track.spotify_id}`], {}, ((err, data) => {
    if (err) {
      console.log('Something went wrong!', track.title, ' : ' , err);
      failed.push(track);
      writeOutFailures();
    } else {
      console.log(`Added ${track} to playlist!`);
    }
  })
  );
})

function writeOutFailures() {
  writeJson(outputFile, failed, function(err) {
    if (err) {
      console.log('oops, error writing to file ', err);
    } else {
      console.log('fails made');
    }
  })
}
