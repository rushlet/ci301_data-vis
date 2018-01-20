var SpotifyWebApi = require('spotify-web-api-node');
var writeJson = require('write-json');
var keys = require('../data_gathering/spotify_keys.json')
var tracks = require('../data_analysis/data/fixed_data_for_analysis.json')
var client = keys["2"]["client"];
var secret = keys["2"]["secret"];
var outputFile = './failed.json';
let failed = {};
let itemsProcessed = 0;
let id = 0;

var spotifyApi = new SpotifyWebApi({
  clientId : client,
  clientSecret : secret,
  redirectUri : 'http://localhost:8888/callback'
});

spotifyApi.setAccessToken('BQD8IfkP74KMHFJ2ZkmIXtEbUnDJtEmFid63P53-E6qIPbN6C7IIV7ATVEVRnDeCF7ml_iQAussPyI7ckXWgdRyybApHtXUF4_Yh3q8dpQiYemWRC9TGLVBn6X3jgx2Lk3dKLZHXlmhr-M09rWnJaQUd39bL9DfAApQNFFaP6JfX1WS38yKCenleeUU&refresh_token=AQB6gtcSMEStESuIwOaDJxwDHXtEsCZWBSCmmS87qVyWk5gPDAbldqiA1MaBGQKcCIs6y-plq2iiF3ptxp1ITqTz5PyhF8_W5M9J9jMewi2RGCuO_DyEHpUnlDUzyF6LMvA');

tracks.forEach((track)=>{
  let spotifyID = track.spotify_id;
  spotifyApi.addTracksToPlaylist('rushlet', '6DNZV1L405XpElhIAUHaKZ', [`spotify:track:${spotifyID}`], {}, ((err, data) => {
    setTimeout(function () {
      if (err) {
        console.log('Something went wrong!', track.title, ' : ' , err);
        failed[id] = `spotify:track:${spotifyID}`;
        id++;
      } else {
        console.log(`Added ${track.title} to playlist!`);
      }
    }, 2000);
    itemsProcessed++;
    if(itemsProcessed === tracks.length) {
      writeOutFailures();
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
