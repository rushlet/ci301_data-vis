import scrollama from 'scrollama';
import SwarmChart from './swarm-chart.js';
import LineChart from './line-chart.js'
import config from './config.js';


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
    if (currentStep.dataset.step === "swarm--intro" || currentStep.dataset.step === "swarm--explore") {
      swarm.zoomReset();
      swarm.removeAllAnnotations();
    }
    if (currentStep.dataset.step === "swarm--longest") {
      swarm.zoomAndPan(-1950, 150, 5.5);
      swarm.removeAllAnnotations();
      swarm.highlightArtistNode('Beatles', 758, 212, 15, 40);
      swarm.highlightArtistNode('Elvis', 850, 210, -15, 42);
    }
    if (currentStep.dataset.step === "swarm--successful") {
      swarm.zoomAndPan(225, 75, 3);
      swarm.removeAllAnnotations();
      swarm.highlightArtistNode('Cliff Richard', 500, 218, -15, 33);
      swarm.highlightArtistNode('Madonna', 320, 205, 0, 46);
      swarm.highlightArtistNode('Westlife', 250, 180, 15, -20);
    }
    if (currentStep.dataset.step === "swarm--frankie-laine") {
      swarm.zoomAndPan(650, 350, 8);
      swarm.removeAllAnnotations();
      swarm.highlightArtistNode('Frankie Laine', 370, 199, 15, 30);
    }
    if (currentStep.dataset.step === "swarm--wet-wet-wet") {
      swarm.zoomAndPan(1200, 300, 7.5);
      swarm.removeAllAnnotations();
      swarm.highlightArtistNode('Wet Wet Wet', 265, 212, 13, 20);
    }
    if (currentStep.dataset.step === "swarm--bieber") {
      swarm.zoomAndPan(700, 300, 7);
      swarm.removeAllAnnotations();
      swarm.highlightArtistNode('Justin Bieber', 360, 210, 15, 24);
      swarm.highlightArtistNode('Madonna', 320, 205, -5, 20);
      swarm.highlightArtistNode('Take That', 360, 180, 20, -3);
    }
    if (currentStep.dataset.step === "line-chart--intro") {
      if (config["lineChartBuilt"] === true) {
        lineChart.addLines(['danceability', 'valence', 'energy']);
        lineChart.zoomAndPan(0, 0, 1);
      } else {
        lineChart.buildGraph();
      }
    }
    if (currentStep.dataset.step === "line-chart--reset") {
      lineChart.zoomAndPan(0, 0, 1);
    }
    if (currentStep.dataset.step === "line-chart--acousticness-intro") {
      lineChart.removeLines(['danceability', 'valence', 'energy']);
      lineChart.removeAllAnnotations();
    }
    if (currentStep.dataset.step === "line-chart--acousticness-low") {
      lineChart.zoomAndPan(-950, -1000, 7);
      lineChart.annotate('2009', 610, 470, -20, 0);
    }
    if (currentStep.dataset.step === "line-chart--acousticness-high") {
      lineChart.zoomAndPan(-1400, -800, 7);
      lineChart.annotate('2015', 665, 390, -20, 0);
    }
    if (currentStep.dataset.step === "line-chart--danceability-intro") {
      lineChart.removeLines(['acousticness']);
      lineChart.removeAllAnnotations();
      lineChart.addLines(['danceability']);
      lineChart.zoomAndPan(0, 0, 1);
    }
    if (currentStep.dataset.step === "line-chart--danceability-high") {
      lineChart.zoomAndPan(400, 500, 6);
      lineChart.annotate('1983', 375, 220, -20, -10);
    }
    if (currentStep.dataset.step === "line-chart--danceability-low") {
      lineChart.zoomAndPan(1400, -100, 6);
      lineChart.annotate('1967', 225, 330, -20, 5);
    }
    if (currentStep.dataset.step === "line-chart--valence-intro") {
      lineChart.removeAllAnnotations();
      lineChart.removeLines(['danceability']);
      lineChart.addLines(['valence']);
      lineChart.zoomAndPan(0, 0, 1);
    }
    if (currentStep.dataset.step === "line-chart--valence-high") {
      lineChart.zoomAndPan(1400, 600, 6);
      lineChart.annotate('1963', 193, 177, 15, 0);
    }
    if (currentStep.dataset.step === "line-chart--valence-low-1954") {
      lineChart.zoomAndPan(1800, 0, 6);
      lineChart.annotate('1954', 110, 315, 20, 5);
    }
    if (currentStep.dataset.step === "line-chart--valence-low-1996") {
      lineChart.zoomAndPan(-400, -50, 6);
      lineChart.annotate('1996', 495, 310, 0, 20);
    }
    if (currentStep.dataset.step === "line-chart--explore") {
      lineChart.zoomAndPan(0, 0, 1);
      lineChart.removeAllAnnotations();
      lineChart.addLines(['danceability', 'acousticness', 'energy']);
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
      swarm.highlightArtistNode(artist, '#000');
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
