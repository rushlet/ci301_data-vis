var writeJson = require('write-json');
var tidied_data = require('../data_analysis/data/fixed_data_for_analysis.json');
var all_songs = require('./old-data-gathering-files/updated_charts.json');
var outputFile = './re-entries.json';
var reentryFile = './all-tracks-with-reentry-count.json';
let output = {};

let reentries = [];

// tidied_data.forEach((track) => {
//   if (track.consecutive === "FALSE") {
//     let currentTrack = {
//       "track": track.title,
//       "artist": track.artist,
//       "id": track.spotify_id
//     }
//     reentries.push(currentTrack);
//   }
// })
//
// reentries.forEach((reentry) => {
//   let count = 0;
//   all_songs.forEach((song) => {
//     if (song[0].title === reentry.track) {
//       if (song[0].artist === reentry.artist) {
//         count ++;
//         reentry["count"] = count;
//       }
//       else if (song[0].artist.replace(" FT ", " ") === reentry.artist) {
//           count ++;
//           reentry["count"] = count;
//       }
//     }
//   })
// })
//
// // ones skipped by the first check (likely due to spelling differences)
// reentries.forEach((reentry) => {
//   let count = -1;
//   if (! reentry.count) {
//     all_songs.forEach((song) => {
//       if (song[0].title.includes(reentry.track)) {
//         count ++;
//         reentry["count"] = count;
//       }
//     })
//   }
// })
//
// writeJson(outputFile, reentries, function(err) {
//   if (err) {
//     console.log('error :(  : ', err);
//   } else {
//     console.log('done! :)');
//   }
// })
//
// all_tracks = tidied_data;
//
// all_tracks.forEach((track) => {
//   track["times_at_one"] = 1;
//   reentries.forEach((reentry => {
//     if (track.spotify_id === reentry.id) {
//       track["times_at_one"] = reentry.count;
//     }
//   }))
// })
//
// writeJson(reentryFile, all_tracks, function(err) {
//   if (err) {
//     console.log('error :(  : ', err);
//   } else {
//     console.log('done! :)');
//   }
// })


// re-entry check:

var reentered = require('./all-tracks-with-reentry-count.json');
reentered.forEach((track) => {
  if (track.consecutive === "FALSE" && track.times_at_one === 1) {
    console.log('error with: ', track.title);
  }
})
