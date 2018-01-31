
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

spotifyApi.setAccessToken('BQAKzzggx0uiw4nmCoy8DYok9Z7v0I5fvH_Rwd4Gdc3X4LD5OoZnKHa4A4S4E-EnHU9q5jFYK_kIS9Mku3XJdKuAbt6J-VciN13fLaWIDH7xQrzKgoNq6AKj9l9qQxLLptCHN74Fv2i4KQuXFPVpgj2H5J20WS53vpg_Fr-RoH_dbgHeaLOc-jH2QQnm56Ecii01Ww');

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
        if (!track.imageUrl) {
          spotifyApi.getArtist(track.artistId)
            .then(function(data) {
              track["imageUrl"] = data.body.images[2].url;
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
