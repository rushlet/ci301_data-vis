import scrollama from 'scrollama';
import SwarmChart from './swarm-chart.js';
import * as d3 from "d3-dispatch";

const scroller = scrollama();
let swarm;
let artists;

if (document.getElementById('project-page') !== null) {
  swarm = new SwarmChart();
  swarm.swarmChart();
  scroller
    .setup({
      step: '.scroll__text .step', // required
      container: '.scroll', // required (for sticky)
      graphic: '.scroll__graphic', // required (for sticky)
      offset: 0.33, // optional, default = 0.5
      debug: false // optional, default = false
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);

  artists = document.querySelectorAll('.artist-name');
}

function handleStepEnter(interaction, steps) {
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
}

function handleStepExit(interaction, steps) {
  const currentStep = interaction.element;
  currentStep.classList.remove('is-active');
}

function resetArtists(artistsToReset) {
  artistsToReset.forEach((artist) => {
    artists.forEach((artistText)=>{
      if (artistText.textContent.includes(capitalize(artist))) {
        artistText.style.color = '#000';
      }
    })
    swarm.highlightArtistNode(artist, '#000');
  })
}

function capitalize(string) {
  return string.toLowerCase()
          .split(' ')
          .map(function(word) { return word[0].toUpperCase() + word.substr(1); })
          .join(' ');
}

export default scroller;
