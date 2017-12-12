var writeJson = require('write-json');
var uniqueArtists = require('./uniqueArtists.json');
var all_tracks = require('./fixed_data_for_analysis.json');
var outputFile = './unique_artists_with_tracks.json';
let output = {};

uniqueArtists.forEach((artist) => {
  let currentArtist = artist.Artist;
  if (typeof currentArtist !== "string") {
    currentArtist = String(currentArtist);
  }
  let count = 0;
  all_tracks.forEach((track) => {
    var trackArtist = track.artist;
    if (typeof trackArtist !== "string") {
      trackArtist = String(trackArtist);
    }
    if (trackArtist.includes(currentArtist)) {
      count++;
      output[currentArtist] = count;
    }
  });
});
writeJson(outputFile, output, function(err) {
  console.log('error :(  : ', err);
})
