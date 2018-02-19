import scrollama from 'scrollama';
import SwarmChart from './swarm-chart.js';
import LineChart from './line-chart.js'
import config from './config.js';
import * as chartFunctions from './chart-utils.js'

let swarm;
let artists;
let lineChart;

class Scroller {
  constructor() {
    const scroller = scrollama();
    if (document.getElementById('project-page') !== null) {
      swarm = new SwarmChart();
      swarm.swarmChart();
      lineChart = new LineChart();
      scroller
        .setup({
          step: '.scroll__text .step',
          container: '.scroll',
          graphic: '.scroll__graphic',
          offset: 0.33,
          debug: false
        })
        .onStepEnter(this.handleStepEnter)
        .onStepExit(this.handleStepExit);

      artists = document.querySelectorAll('.artist-name');
    }
  }

  handleStepEnter(interaction, steps) {
    const currentStep = interaction.element;
    currentStep.classList.add('is-active');
    switch(currentStep.dataset.step) {
        case "swarm--intro":
        case "swarm--explore":
          chartFunctions.zoomReset('swarm-chart');
          chartFunctions.removeAllAnnotations('swarm-chart');
          break;
        case "swarm--longest":
          chartFunctions.zoomAndPan('swarm-chart', -1950, 150, 5.5);
          chartFunctions.removeAllAnnotations('swarm-chart');
          chartFunctions.annotate('swarm-chart', 'Beatles', 758, 212, 15, 40);
          chartFunctions.annotate('swarm-chart', 'Elvis', 850, 210, -15, 42);
          break;
        case "swarm--successful":
          chartFunctions.zoomAndPan('swarm-chart', 225, 75, 3);
          chartFunctions.removeAllAnnotations('swarm-chart');
          chartFunctions.annotate('swarm-chart', 'Cliff Richard', 500, 218, -15, 33);
          chartFunctions.annotate('swarm-chart', 'Madonna', 320, 205, 0, 46);
          chartFunctions.annotate('swarm-chart', 'Westlife', 250, 180, 15, -20);
          break;
        case "swarm--frankie-laine":
          chartFunctions.zoomAndPan('swarm-chart', 650, 350, 8);
          chartFunctions.removeAllAnnotations('swarm-chart');
          chartFunctions.annotate('swarm-chart', 'Frankie Laine', 370, 199, 15, 30);
          break;
        case "swarm--wet-wet-wet":
          chartFunctions.zoomAndPan('swarm-chart', 1200, 300, 7.5);
          chartFunctions.removeAllAnnotations('swarm-chart');
          chartFunctions.annotate('swarm-chart', 'Wet Wet Wet', 265, 212, 13, 20);
          break;
        case "swarm--bieber":
          chartFunctions.zoomAndPan('swarm-chart', 700, 300, 7);
          chartFunctions.removeAllAnnotations('swarm-chart');
          chartFunctions.annotate('swarm-chart', 'Justin Bieber', 360, 210, 15, 24);
          chartFunctions.annotate('swarm-chart', 'Madonna', 320, 205, -5, 20);
          chartFunctions.annotate('swarm-chart', 'Take That', 360, 180, 20, -3);
          break;
        case "line-chart--intro":
          if (config["lineChartBuilt"] === true) {
            if (interaction.direction === "up") {
              lineChart.addLines(['danceability', 'valence', 'energy']);
              lineChart.removeLines(["liveness", "instrumentalness", "speechiness"]);

            }
          } else {
            lineChart.buildMainGraph();
            lineChart.removeLines(["liveness", "instrumentalness", "speechiness"]);
          }
          break;
        case "line-chart--reset":
          chartFunctions.zoomReset('line-chart');
          break;
        case "line-chart--acousticness-intro":
          lineChart.removeLines(['danceability', 'valence', 'energy']);
          chartFunctions.removeAllAnnotations('line-chart');
          chartFunctions.zoomReset('line-chart');
          break;
        case "line-chart--acousticness-low":
          chartFunctions.zoomAndPan('line-chart', -950, -1000, 7);
          chartFunctions.annotate('line-chart', '2009', 615, 470, -20, 0);
          break;
        case "line-chart--acousticness-high":
          chartFunctions.zoomAndPan('line-chart', -1400, -800, 7);
          chartFunctions.annotate('line-chart', '2015', 670, 388, -20, 0);
          if (interaction.direction === "up") {
            lineChart.removeLines(['danceability']);
            lineChart.addLines(['acousticness']);
          }
          break;
        case "line-chart--danceability-intro":
          lineChart.removeLines(['acousticness']);
          chartFunctions.removeAllAnnotations('line-chart');
          lineChart.addLines(['danceability']);
          chartFunctions.zoomReset('line-chart');
          break;
        case "line-chart--danceability-high":
          chartFunctions.zoomAndPan('line-chart', 400, 500, 6);
          chartFunctions.annotate('line-chart', '1983', 375, 220, -20, -10);
          break;
        case "line-chart--danceability-low":
          chartFunctions.zoomAndPan('line-chart', 1400, -100, 6);
          chartFunctions.annotate('line-chart', '1967', 227, 330, -20, 5);
          if (interaction.direction === "up") {
            lineChart.removeLines(['valence']);
            lineChart.addLines(['danceability']);
          }
          break;
        case "line-chart--valence-intro":
          chartFunctions.removeAllAnnotations('line-chart');
          lineChart.removeLines(['danceability']);
          lineChart.addLines(['valence']);
          chartFunctions.zoomReset('line-chart');
          break;
        case "line-chart--valence-high":
          chartFunctions.zoomAndPan('line-chart', 1400, 600, 6);
          chartFunctions.annotate('line-chart', '1963', 193, 177, 15, 0);
          break;
        case "line-chart--valence-low-1954":
          chartFunctions.zoomAndPan('line-chart', 1800, 0, 6);
          chartFunctions.annotate('line-chart', '1954', 110, 315, 20, 5);
          break;
        case "line-chart--valence-low-1996":
          lineChart.removeLines(['danceability', 'acousticness', 'energy']);
          chartFunctions.zoomAndPan('line-chart', -400, -50, 6);
          chartFunctions.annotate('line-chart', '1996', 495, 310, 0, 20);
          break;
        case "line-chart--explore":
          chartFunctions.zoomReset('line-chart');
          chartFunctions.removeAllAnnotations('line-chart');
          lineChart.addLines(['danceability', 'acousticness', 'energy']);
          lineChart.addCheckboxListeners();
          lineChart.explore();
          break;
    }

  }

  handleStepExit(interaction, steps) {
    const currentStep = interaction.element;
    currentStep.classList.remove('is-active');
  }

  resetArtists(artistsToReset) {
    artistsToReset.forEach((artist) => {
      artists.forEach((artistText)=>{
        if (artistText.textContent.includes(capitalize(artist))) {
          artistText.style.color = '#000';
        }
      })
      swarm.annotate(artist, '#000');
    })
  }

  capitalize(string) {
    return string.toLowerCase()
            .split(' ')
            .map(function(word) { return word[0].toUpperCase() + word.substr(1); })
            .join(' ');
  }

}

export default Scroller;
