import config from './config.js';

export default function meanData() {
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
