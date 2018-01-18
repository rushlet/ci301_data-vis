var writeJson = require('write-json');
var uniqueArtists = require('./uniqueArtists.json');
var all_tracks = require('./fixed_data_for_analysis.json');
var outputFile = './unique_artists_track_count.json';
let output = {};
let id = 0;

uniqueArtists.forEach((artist) => {
  let currentArtist = artist["ARTIST"];
  if (typeof currentArtist !== "string") {
    currentArtist = String(currentArtist);
  }
  let count = 0;
  output[id] = {};
  output[id]["artist"] = currentArtist;
  output[id]['total_weeks'] = 0;
  all_tracks.forEach((track) => {
    var trackArtist = track.artist;
    if (typeof trackArtist !== "string") {
      trackArtist = String(trackArtist);
    }
    if (trackArtist.search(`\\b${currentArtist}\\b`) != -1) {
      count++;
      output[id]['count'] = count;
      output[id]['total_weeks'] += parseInt(track.weeks_at_1);
    }
  });
  id++;
});
writeJson(outputFile, output, function(err) {
  console.log('error :(  : ', err);
})
