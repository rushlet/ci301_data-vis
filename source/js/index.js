import scroller from './scroller.js';
import Spotify from 'spotify-web-api-js';
import $ from 'jquery';

let loggedIn = false;
let userTopTracks;

if (document.getElementById('spotify-log-in') !== null) {
  document.getElementById('spotify-log-in').addEventListener("click", spotifyAuth, false);
}

function spotifyAuth() {
  var clientID = 'ddba468408e2427090e0d79450f3d535';
  var url = 'http://127.0.0.1:8080/website/index.html';
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
    console.error(err);
  });
}
