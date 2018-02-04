import scroller from './scroller.js';
import Spotify from 'spotify-web-api-js';
import $ from 'jquery';

let loggedIn = false;
let userTopTracks;

if (document.getElementById('spotify-log-in') !== null) {
  document.getElementById('spotify-log-in').addEventListener("click", spotifyAuth, false);
  document.getElementById('skip-log-in').addEventListener("click", skipLogIn, false);
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

if (window.location.href.includes('access_token')) {
  var url = window.location.href;
  var access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
  localStorage.setItem('access_token', access_token);
  console.log(localStorage.getItem('access_token'));
  loggedIn = true;
}

if (localStorage.getItem('access_token') !== null) {
  var spotifyApi = new Spotify();
  spotifyApi.setAccessToken(localStorage.getItem('access_token'));
  spotifyApi.getMyTopTracks('limit:10')
    .then(function(data) {
    console.log('top tracks', data);
  }, function(err) {
    if (err.status === 401) {
      spotifyAuth();
      // window.location.href = './index.html';
    }
  });
}
