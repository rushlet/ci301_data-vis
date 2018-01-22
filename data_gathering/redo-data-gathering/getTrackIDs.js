var SpotifyWebApi = require('spotify-web-api-node');
var writeJson = require('write-json');
var tracks = require('./compiledData.json')
var keys = require('../../data_gathering/spotify_keys.json')
var client = keys["2"]["client"];
var secret = keys["2"]["secret"];
var outputFile = './compiledData.json';
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

spotifyApi.setAccessToken('BQD3gKWwZgdEdJ7dyClKmrQMyPJ8BGC8fxQIpgMj3IA8VUv2bYDYmyIgfa3v80ZH-SipSmprygkgcHCNU-g9L9UiF57de5TixuFQ1Fnuy7UV_nv0UdBtqAhk6cDPf4dZOBb39526Sn9YJV_doXmGEktxMHn9ihlBppRkUmZqimnult0X_-_KIC0Z72A');

tracks.forEach((track)=>{
  setTimeout(function () {
    if (!track.spotify_id || track.spotify_id === 'error') {
      console.log(track.title);
      count++;
      let toSendToSpotify = checkSongDetails(track.title, track.artist);
      spotifyApi.searchTracks(`track:${toSendToSpotify[0]} artist:${toSendToSpotify[1]}`, { limit : 1})
        .then(function(data) {
          if (data.body.tracks.items.length === 0) {
            if (track.title === 'LET IT BE' && track.artist === 'FERRY AID') {
              trackID = '7gGYXXCSkzWNEEKzMToCjX';
            } else if (track.title === 'DOCTORIN\' THE TARDIS') {
              trackID = '1e388YJ0UlDpKQRZntkRoH';
            } else if (track.title === 'DO THEY KNOW IT\'S CHRISTMAS?' && track.artist === 'BAND AID II') {
              trackID = '2M5Ae3Zokq8RsJPDnUSAKR';
            } else if (track.title === 'COME ON YOU REDS') {
              trackID = '73FT7FAMhz5QEso658Etii';
            } else if (track.title === 'NO CHARGE') {
              trackID = '0ZQgjVTcyFsU31acxzSL3K';
            } else if (track.title === 'GLAD ALL OVER') {
              trackID = '3csXYDnTcqmplHi0yCvTYg';
            } else if (track.title === "CAN WE FIX IT") {
              trackID = '3WbKqxKwRPSRFFei1Qokh9';
            } else if (track.artist === "CHEF") {
              trackID = '7kORUUq04C2viRj5ch6eFg';
            } else if (track.title === "JCB SONG") {
              trackID = '6LnUIb1mSuCk2MDh4DHeW3';
            } else if (track.artist === "OZZY KELLY OSBOURNE") {
              trackID ='0fwf70TYvVls7KGlFdSHtx';
            } else if (track.title === "RUN THIS TOWN") {
              trackID = '40iDB6ut0ofvKFUz3NmSik';
            } else if (track.title === "GET AWAY") {
              trackID = '6CgGuOY2ZaXhdaF61xovvE';
            } else if (track.title === "COZ I LUV YOU") {
              trackID = '1vkXcT9lZnOGJbM8hFbVAC';
            } else if (track.title === "TAKE ME BAK 'OME") {
              trackID = '0IJMTYSeQCxLorB0GgqSCp';
            } else if (track.title === "SKWEEZE ME PLEEZE ME") {
              trackID = '20W8W3uxdYjsrwiWNsiv6E';
            } else if (track.title === "EYE LEVEL") {
              trackID = '6LZ8ujvVMyXKnmWcP7bdJ8';
            } else if (track.artist === "TELLY SAVALAS") {
              trackID ='0Uk5zcct6c2ImJouia3XoH';
            } else if (track.title === "IT'S MY PARTY") {
              trackID = '68jXsT3f2Kt8fdmBPtiFOW';
            } else if (track.artist === "NICOLE") {
              trackID = '5DDATcmTifdzgtae2q2RL0';
            } else if (track.title === "SAVE YOUR LOVE") {
              trackID = '4N5cRaRJmHpJhkWvA9UyED';
            } else if (track.title === "THE FIRST TIME") {
              trackID = '1FQ0ecMZMI3ArhcJQPROFP';
            } else if (track.title === "LOVE CAN BUILD A BRIDGE") {
              trackID = '17sCn0nWVKKFpkNNwua0kS';
            } else if (track.title === "WHAT BECOMES OF THE BROKENHEARTED") {
              trackID = '3Q7chp6MMGq6ma5awyOtRP';
            } else if (track.title === "SWEET LIKE CHOCOLATE") {
              trackID = '2s8TBgkKwG1AkdkH8BaML1';
            } else if (track.title === "TOCA'S MIRACLE") {
              trackID = '0RhGsGH99z3Zv8Wwo5JXYc';
            } else if (track.title === "WHAT BECOMES OF THE BROKENHEARTED") {
              trackID = '3Q7chp6MMGq6ma5awyOtRP';
            } else if (track.title === "WISHING ON A STAR") {
              trackID = '1wQM0OKcYAs1WL5NOjeaAq';
            } else if (track.artist === "STEVE BROOKSTEIN") {
              trackID = '0j7XmargEVQ7zOxBfwJvZ6';
            } else if (track.artist === "LEON JACKSON") {
              trackID = '39yRR6BPutUaXSaGBw3TLU';
            } else if (track.artist === "JUSTICE COLLECTIVE") {
              trackID = '/7kakk64AMtK9jBku94bGrN';
            }
            else {
              if (track.title === "THE CHICKEN SONG" || track.title === "GYM AND TONIC" || track.artist === "SAM & MARK" || track.title === "THE STONK" ) {
                trackID = "not available on spotify"
              } else {
                trackID = 'error'
              }
            }
          } else {
            trackID = data.body.tracks.items[0].id;
          }
          track["spotify_id"] = trackID;
          writeOutOutput();
        }, function(err) {
          console.log('Something went wrong!', err);
          failed.push([track.title, track.artist]);
      });
    }
  }, 2000);
  itemsProcessed++;
})

function checkSongDetails(title, artist) {
  if (title === "EVERYBODY'S FREE (TO WEAR SUNSCREEN)") {
    artist = "QUINDON TARVER";
  }
  if (title === "MAMBO NO 5" && artist === "BOB THE BUILDER") {
    artist = "THE HOOPTY DO'S";
  }
  if (title === "WHAT A WONDERFUL WORLD" && artist === "EVA CASSIDY KATIE MELUA") {
    artist = "EVA CASSIDY";
  }
  if (title === "EBONY AND IVORY") {
    artist = "PAUL McCARTNEY";
  }
  if (artist === "PETER ANDRE BUBBLER RANX") {
    artist = "PETER ANDRE";
  }
  if (title === "MR BLOBBY") {
    artist = "KIDZONE";
  }
  if (title === "GROOVEJET (IF THIS AIN'T LOVE)") {
    title = "GROOVEJET";
  }
  if (title === "HEARTBEAT/TRAGEDY") {
    title = "TRAGEDY";
  }
  if (title === "THUNDERBIRDS/3AM") {
    title = "3AM";
  }
  if (title === "HOLIDAY") {
    artist = "DIZZEE RASCAL";
  }
  if (artist === "TONY CHRISTIE PETER KAY") {
    artist = "TONY CHRISTIE";
  }
  if (artist === "DJ SAMMY YANOU DO") {
    artist = "DJ SAMMY DO";
  }
  if (artist === "2PAC ELTON JOHN") {
    artist = "2PAC";
  }
  return [title.toLowerCase(), artist.toLowerCase()];
}


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
