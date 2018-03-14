var chai = require('chai');
var functions = require('./functions-to-test.js');
var assert = chai.assert;

var song1 = {
    "title": "HELP!",
    "artist": "THE BEATLES",
    "spotify_id": "1dfuJYDSIc41cw5RPsaCF1",
    "danceability": 0.602,
    "energy": 0.736,
    "key": 11,
    "loudness": -6.51,
    "speechiness": 0.0332,
    "acousticness": 0.149,
    "instrumentalness": 0,
    "liveness": 0.0776,
    "valence": 0.819,
    "tempo": 94.931,
    "duration_ms": 139240,
    "time_signature": 4,
    "date": "05/08/1965",
    "decade": 1960,
    "weeks_at_1": 3,
    "consecutive": "TRUE",
    "times_at_one": 1,
    "year": 1965,
    "preview_url": "https://p.scdn.co/mp3-preview/46aeed8650533caf77314fe7e46a015516bcaa1a?cid=ddba468408e2427090e0d79450f3d535"
  };
var song2 =   {
    "title": "LET'S DANCE",
    "artist": "DAVID BOWIE",
    "spotify_id": "0F0MA0ns8oXwGw66B2BSXm",
    "danceability": 0.619,
    "energy": 0.703,
    "key": 10,
    "loudness": -9.414,
    "speechiness": 0.0525,
    "acousticness": 0.00388,
    "instrumentalness": 0.205,
    "liveness": 0.163,
    "valence": 0.709,
    "tempo": 115.043,
    "duration_ms": 457133,
    "time_signature": 4,
    "date": "09/04/1983",
    "decade": 1980,
    "weeks_at_1": 3,
    "consecutive": "TRUE",
    "times_at_one": 1,
    "year": 1983,
    "preview_url": "https://p.scdn.co/mp3-preview/1157e120445585f0155b9d1ca303029b8068d9a4?cid=ddba468408e2427090e0d79450f3d535"
  };

describe('Capitalize', function() {
  it('should capitalize the first letter of each word in a string', function() {
    var testString = "hello, my name is becky";
    var capitalisedString = functions.capitalize(testString);
    var expectString = "Hello, My Name Is Becky";
    assert.equal(capitalisedString, expectString);
  });
  it('should capitalize the first letter of each word in a string, even if it starts with a bracket', function() {
    var testString = "(hello) my (name) is becky";
    var capitalisedString = functions.capitalize(testString);
    var expectString = "(Hello) My (Name) Is Becky";
    assert.equal(capitalisedString, expectString);
  });
  it('should capitalize the first letter of each word in a string, and the other letters should be lowercase', function() {
    var testString = "hELLo, my NAme Is bECKy";
    var capitalisedString = functions.capitalize(testString);
    var expectString = "Hello, My Name Is Becky";
    assert.equal(capitalisedString, expectString);
  });
});

describe('cleanDataForBarChart', function() {
  it('should format data from the charts dataset into an object to be consumed by the bar chart', function() {
      var output = [{
              'title': "HELP!",
              'artist': "THE BEATLES",
              'features': {
                'danceability': 0.602,
                'valence': 0.819,
                'acousticness': 0.149,
                'energy': 0.736,
                'instrumentalness': 0,
                'liveness': 0.163,
                'speechiness': 0.0332,
              }
            },
            {
              'title': "LET'S DANCE",
              'artist': "DAVID BOWIE",
              'features': {
                'danceability': 0.619,
                'valence': 0.709,
                'acousticness': 0.00388,
                'energy': 0.703,
                'instrumentalness': 0.205,
                'liveness': 0.163,
                'speechiness': 0.0525,
              }
      }];
      assert.equal(functions.cleanDataForBarChart(song1, song2), output);
  });
});
