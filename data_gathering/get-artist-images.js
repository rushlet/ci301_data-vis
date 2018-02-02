
var SpotifyWebApi = require('spotify-web-api-node');
var writeJson = require('write-json');
var tracks = require('./data-with-artist-images.json')
var keys = require('./spotify_keys.json')
var client = keys["2"]["client"];
var secret = keys["2"]["secret"];
var outputFile = './data-with-artist-images.json';
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

spotifyApi.setAccessToken('BQDbyp_1gPVA3IqJJmEc5WjC-fDPPXUpNWmOrk7ZtbxyO9ZMW7rQnGcP0BmzPrqunOcArls29VcuEIlCXwPLHhvbizWV5Ux6GF0DV22K9Qvx4LhOJaeYLnntKjnwP2bbjR0blQ-_6YayDA');

// tracks.forEach((track)=>{
//   setTimeout(function () {
//       if (!track.artistId) {
//         spotifyApi.searchArtists(`artist:${track.artist}`, { limit : 1})
//           .then(function(data) {
//             track["artistId"] = data.body.artists.items[0].id;
//             writeOutOutput();
//           }, function(err) {
//             console.log('Something went wrong!', err);
//             failed.push([track.title, track.artist]);
//         });
//         failed.push(track);
//         writeOutFailures();
//       }
//   }, 2000);
//   itemsProcessed++;
// })

tracks.forEach((track)=>{
  setTimeout(function () {
      if (track.artistId) {
        if (!track.imageHeight || !track.imageWidth) {
          spotifyApi.getArtist(track.artistId)
            .then(function(data) {
              console.log(data.body.images[2]);
              track["imageUrl"] = data.body.images[2].url;
              track["imageWidth"] = data.body.images[2].width;
              track["imageHeight"] = data.body.images[2].height;
              writeOutOutput();
            }, function(err) {
              console.log('Something went wrong!', err);
              failed.push([track.title, track.artist]);
          });
        }
        // failed.push(track);
        // writeOutFailures();
      }
  }, 2000);
  itemsProcessed++;
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
