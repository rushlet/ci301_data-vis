import Scroller from './scroller.js';
import Spotify from 'spotify-web-api-js';
import addTrackPreviewListeners from './preview-tracks.js'
import config from './config.js';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/dialog.js';
import * as dataCleaner from './data-cleaner.js';
import BarChart from './bar-chart.js';


let loggedIn = false;
let songPlaying = false;

if (document.getElementById('spotify-log-in') !== null) {
  document.getElementById('spotify-log-in').addEventListener("click", spotifyAuth, false);
  document.getElementById('skip-log-in').addEventListener("click", skipLogIn, false);
} else {
  if (window.location.href.includes('access_token')) {
    var url = window.location.href;
    var access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
    localStorage.setItem('access_token', access_token);
    loggedIn = true;
    let playlistButtons = document.querySelectorAll('.spotify-playlist');
    playlistButtons.forEach((button) => {
      button.addEventListener("click", followPlaylist, false);
    });
    getUserTopTracks();
  } else {
    let playlistButtons = document.querySelectorAll('.spotify-playlist');
    playlistButtons.forEach((button) => {
      button.style.display = 'none';
    });
  }
}

$.getJSON( "./assets/data/fixed_data_for_analysis.json", function( data ) {
  config['dataset'] = data;
  addTrackPreviewListeners();
  dataCleaner.meanData();
  new Scroller;
});

function getUserTopTracks() {
  let spotifyApi = new Spotify();
  let userTopTracks = {};
  spotifyApi.setAccessToken(localStorage.getItem('access_token'));
  spotifyApi.getMe()
    .then(function(data) {
      config['user_id'] = data.id;
    },
    function(err) {
      if (err.status === 401) {
        console.log('error');
        // window.location.href = './index.html';
      }
    });
  spotifyApi.getMyTopTracks('limit:10')
    .then(function(data) {
    data.items.forEach((track) => {
      userTopTracks[track.name] = {};
      userTopTracks[track.name].title = track.name;
      userTopTracks[track.name].spotify_id = track.id;
      spotifyApi.getArtist(track.artists[0].id)
        .then(function(data) {
          userTopTracks[track.name].artist = data.name;
        }, function(err) {

      });
      spotifyApi.getAudioFeaturesForTrack(track.id)
        .then(function(data) {
          for (var feature in data) {
            userTopTracks[track.name][feature] = data[feature];
          }
        },
        function(err) {
          if (err.status === 401) {
            console.log('error');
            // window.location.href = './index.html';
          }
      });
    });
    config["user_top_tracks"] = userTopTracks;
  },
  function(err) {
    if (err.status === 401) {
      spotifyAuth();
      // window.location.href = './index.html';
    }
  });
}

function skipLogIn() {
  window.location.href = './project.html';
}

function spotifyAuth() {
  var clientID = 'ddba468408e2427090e0d79450f3d535';
  var path = 'website/project.html';
  if (window.location.host === 'rushlet.github.io') {
    var path = 'ci301_data-vis/website/project.html'
  }
  var url = `${window.location.protocol}//${window.location.host}/${path}`;
  var scopes = 'user-read-private%20user-top-read%20playlist-modify-public';
  var spotifyRequest = `https://accounts.spotify.com/authorize/?client_id=${clientID}&response_type=token&redirect_uri=${url}&scope=${scopes}`;
  window.location.href = spotifyRequest;
}

function followPlaylist() {
  let spotifyApi = new Spotify();
  spotifyApi.followPlaylist(config['user_id'], '6DNZV1L405XpElhIAUHaKZ')
    .then(function(data) {
      customAlert('Success', 'Playlist followed!');
    }, function(err) {
      customAlert('Error', `Oops, we couldn\'t follow the playlist at this time. Error: ${err}`);
  });
}

function customAlert(title, message) {
  $('<div></div>').html( message ).dialog({
      title: title,
      resizable: false,
      modal: true,
      dialogClass: 'alert',
      buttons: {
          'Okay': function()  {
              $( this ).dialog( 'close' );
          }
      }
  });
}
