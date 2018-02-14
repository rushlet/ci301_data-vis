import scrollama from 'scrollama';
import SwarmChart from './swarm-chart.js';
import LineChart from './line-chart.js'

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
          step: '.scroll__text .step', // required
          container: '.scroll', // required (for sticky)
          graphic: '.scroll__graphic', // required (for sticky)
          offset: 0.33, // optional, default = 0.5
          debug: false // optional, default = false
        })
        .onStepEnter(this.handleStepEnter)
        .onStepExit(this.handleStepExit);

      artists = document.querySelectorAll('.artist-name');
    }
  }

  handleStepEnter(interaction, steps) {
    console.log('interaction', interaction);
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
      // trigger building line chart if direciton down (once building of line chart split from constructor)
    }
    if (currentStep.dataset.step === "line-chart--acousticness-intro") {
      lineChart.removeLines(['danceability', 'valence', 'energy']);
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
