var writeJson = require('write-json');
var data = require('../data_gathering/redo-data-gathering/chart_data.json');
var chart_data = require('./updated_charts.json');
var outputFile = './re-entries.json';
var reentryFile = './re-entry-details.json';
let output = {};

let reentries = {};

// data.forEach((track) => {
//   if (track.consecutive === "FALSE") {
//     reentries[track.title] = {};
//     reentries[track.title].total = track.weeks_at_1;
//     reentries[track.title].details = [];
//     chart_data.forEach((chartEntry) => {
//       chartEntry = chartEntry[0];
//       if (chartEntry.title === track.title) {
//         console.log('yay!', chartEntry.title, chartEntry.date, chartEntry.weeks_at_1);
//         let details = {};
//         console.log(chartEntry);
//         details.date = chartEntry.date.toString();
//         details.length = chartEntry.weeks_at_1.toString();
//         reentries[track.title].details.push(details);
//         writeJson();
//       }
//     })
//   }
// })

const entries = require('./re-entry-details.json');
entries.forEach((track)=>{
  let sum;
  let entries = track.details;
  entries.forEach((entry)=>{
    sum = sum + entry.length;
  })
  if (track.count !== sum) {
    console.log(track.title);
  }
})

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
writeJson(reentryFile, reentries, function(err) {
  if (err) {
    console.log('error :(  : ', err);
  } else {
    console.log('done! :)');
  }
})


// re-entry check:
//
// var reentered = require('./all-tracks-with-reentry-count.json');
// reentered.forEach((track) => {
//   if (track.consecutive === "FALSE" && track.times_at_one === 1) {
//     console.log('error with: ', track.title);
//   }
// })
