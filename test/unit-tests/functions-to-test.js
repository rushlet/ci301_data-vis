module.exports = {
  underscoreString: function(string) {
    return string.replace(/ /g,"_");
  },

  capitalize: function(string) {
    var splitStr = string.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      if (!splitStr[i].charAt(0).match(/[a-z]/i) && splitStr[i].charAt(1).match(/[a-z]/i)) {
        splitStr[i] = splitStr[i].charAt(0) + splitStr[i].charAt(1).toUpperCase() + splitStr[i].substring(2);
      } else {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
    }
    return splitStr.join(' ');
  },

  cleanDataForBarChart: function(song1, song2) {
    return [{
            'title': song1.title,
            'artist': song1.artist,
            'features': {
              'danceability': song1.danceability,
              'valence': song1.valence,
              'acousticness': song1.acousticness,
              'energy': song1.energy,
              'instrumentalness': song1.instrumentalness,
              'liveness': song1.liveness,
              'speechiness': song1.speechiness,
            }
          },
          {
            'title': song2.title,
            'artist': song2.artist,
            'features': {
              'danceability': song2.danceability,
              'valence': song2.valence,
              'acousticness': song2.acousticness,
              'energy': song2.energy,
              'instrumentalness': song2.instrumentalness,
              'liveness': song2.liveness,
              'speechiness': song2.speechiness,
            }
          }];
  }
}
