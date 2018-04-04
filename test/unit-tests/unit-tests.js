var chai = require('chai');
var functions = require('./functions-to-test.js');
var variables = require('./variables.js');
var assert = chai.assert;

describe('underscoreString', function() {
  it('should replace the spaces in a string with underscores', function() {
    var testString = "hello, my name is becky";
    var underscoredString = functions.underscoreString(testString);
    var expectString = "hello,_my_name_is_becky";
    assert.equal(underscoredString, expectString);
  });
  it('should replace the spaces in a string with underscores, even at the start', function() {
    var testString = " hello ";
    var underscoredString = functions.underscoreString(testString);
    var expectString = "_hello_";
    assert.equal(underscoredString, expectString);
  });
});

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
                'liveness': 0.0776,
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
      assert.deepEqual(functions.cleanDataForBarChart(variables.chartsSong1, variables.chartsSong2), output);
  });
  it('should format data from the users top tracks into an object to be consumed by the bar chart', function() {
    var output = [{
            'title': "C'est La Vie",
            'artist': "Stereophonics",
            'features': {
              'danceability': 0.459,
              'valence': 0.827,
              'acousticness': 0.0471,
              'energy': 0.925,
              'instrumentalness': 0,
              'liveness': 0.133,
              'speechiness': 0.0442,
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
    assert.deepEqual(functions.cleanDataForBarChart(variables.userSong1, variables.chartsSong2), output);
  });
});
