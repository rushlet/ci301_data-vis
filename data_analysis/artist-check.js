var writeJson = require('write-json');
var uniqueArtists = require('./data/uniqueArtists.json');
var all_tracks = require('../data_gathering/redo-data-gathering/compiledData.json');
var outputFile = './data/unique_artists_track_count.json';
let output = [];
let id = 0;

uniqueArtists.forEach((artist) => {
  let currentArtist = artist["ARTIST"];
  if (typeof currentArtist !== "string") {
    currentArtist = String(currentArtist);
  }
  let count = 0;
  trackDetails = {};
  trackDetails["artist"] = currentArtist;
  trackDetails['total_weeks'] = 0;
  all_tracks.forEach((track) => {
    var trackArtist = track.artist;
    if (typeof trackArtist !== "string") {
      trackArtist = String(trackArtist);
    }
    if (trackArtist.search(`\\b${currentArtist}\\b`) != -1) {
      count++;
      trackDetails['count'] = count;
      trackDetails['total_weeks'] += parseInt(track.weeks_at_1);
    }
  });
  output.push(trackDetails);
  writeOutOutput();
  id++;
});

function writeOutOutput() {
  writeJson(outputFile, output, function(err) {
    if (err) {
      console.log('oops, error writing to file ', err);
    } else {
      console.log('data file made');
    }
  })
}

// var uniqueArtistsFailed = require('./data/unique_artists_track_count.json');
// uniqueArtistsFailed.forEach((artist) => {
//   if (!artist.count) {
//     console.log(artist.artist);
//   }
// });
