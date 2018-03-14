module.exports = {
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
              'instrumentalness': song1.valence,
              'liveness': song1.acousticness,
              'speechiness': song1.energy,
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
              'instrumentalness': song2.valence,
              'liveness': song2.acousticness,
              'speechiness': song2.energy,
            }
          }];
  }

  // overallAverages: function(data) {
  //   let count = 0;
  //   let audioFeatures = ['danceability', 'energy', 'valence', 'acousticness', 'speechiness', 'liveness', 'instrumentalness', 'duration_ms'];
  //   let yearlyAverages = [];
  //   data.forEach((d) => {
  //     if (d.danceability) {
  //       count ++;
  //       audioFeatures.forEach((feature) => {
  //         if (averages[feature]) {
  //           averages[feature] += d[feature];
  //         } else {
  //           averages[feature] = d[feature];
  //         }
  //       });
  //     }
  //   });
  //   for (var feature in averages) {
  //     averages[feature] = averages[feature] / count;
  //   }
  // }
  //
  // yearlyAverages: function(data) {
  // }

}

function meanData() {
  let data = config['dataset'];
  let averages = {};
  let years = new Set();
  let count = 0;
  let audioFeatures = ['danceability', 'energy', 'valence', 'acousticness', 'speechiness', 'liveness', 'instrumentalness', 'duration_ms'];
  let yearlyAverages = [];
  data.forEach((d) => {
    years.add(d.year);
    if (d.danceability) {
      count ++;
      audioFeatures.forEach((feature) => {
        if (averages[feature]) {
          averages[feature] += d[feature];
        } else {
          averages[feature] = d[feature];
        }
      });
    }
  });
  for (var feature in averages) {
    averages[feature] = averages[feature] / count;
  }

  years.forEach((year) => {
    let counter = 0;
    let output = {};
    data.forEach((d) => {
      if (d.year === year) {
        output['year'] = year;
        counter++;
        if (d.danceability) {
          output['count'] = counter;
          audioFeatures.forEach((feature) => {
            if (output[feature]) {
              output[feature] += d[feature];
            } else {
              output[feature] = d[feature];
            }
          });
        }
      }
    });
    audioFeatures.forEach((feature) => {
        output[feature] = (output[feature] / output['count']).toFixed(3);
    });
    yearlyAverages.push(output);
  })

  config["yearlyAverages"] = yearlyAverages;
  config["overallAverages"] = averages;
}
