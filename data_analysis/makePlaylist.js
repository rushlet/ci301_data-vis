var SpotifyWebApi = require('spotify-web-api-node');
var all_tracks = require('./fixed_data_for_analysis.json');


var spotifyApi = new SpotifyWebApi({
  clientId : '30d58fa2956047a7ba12f51bd9ad2438',
  clientSecret : '029860e93bb241eda4fbdacde2e4a18b',
});

// all_tracks.forEach((track) => {
//   trackID = track.spotify_id;
//   spotifyApi.addTracksToPlaylist('rushlet', '6DNZV1L405XpElhIAUHaKZ', trackID)m
//   .then(function(data) {
//     console.log(`Added ${track.title} to playlist!`);
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });
// })
