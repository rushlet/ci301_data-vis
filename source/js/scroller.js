import scrollama from 'scrollama';
import SwarmChart from './swarm-chart.js';
import * as d3 from "d3-dispatch";

const scroller = scrollama();
let swarm;
let artists;

if (document.getElementById('project-page') !== null) {
  swarm = new SwarmChart();
  swarm.swarmChart();

  // const dispatch = d3.dispatch;

  // setup the instance, pass callback functions
  scroller
    .setup({
      step: '.scroll__text .step', // required
      container: '.scroll', // required (for sticky)
      graphic: '.scroll__graphic', // required (for sticky)
      offset: 0.33, // optional, default = 0.5
      debug: false // optional, default = false
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    .onContainerEnter(handleContainerEnter)
    .onContainerExit(handleContainerExit);

  artists = document.querySelectorAll('.artist-name');
}

function handleStepEnter(interaction, steps) {
  //console.log('handleStepEnter', interaction, steps);
  //console.log(interaction.element);
  const currentStep = interaction.element;
  currentStep.classList.add('is-active');
  if (interaction.index===0) {
    // document.querySelector('.scroll__graphic').style.backgroundColor = "#fff";
    // dispatch.call("swarm 1");
    swarm.zoomReset();
    // resetArtists(['BEATLES', 'ELVIS']);
  }
  if (interaction.index===1) {
    // document.querySelector('.scroll__graphic').style.backgroundColor = "#f5a62a";
    swarm.zoomAndPan(-1950, 150, 5.5);

    swarm.highlightArtistNode('Beatles', 758, 212, 15, 40);
    swarm.highlightArtistNode('Elvis', 850, 210, -15, 42);
    // highlightArtist('ELVIS', '#37a1cf');
    // resetArtists(['WESTLIFE', 'MADONNA', 'CLIFF RICHARD']);
  }
  if (interaction.index===2) {
    // document.querySelector('.scroll__graphic').style.backgroundColor = "#55b4d8";
    swarm.zoomAndPan(225, 75, 3);
    // resetArtists(['BEATLES', 'ELVIS', 'FRANKIE LAINE']);
    // highlightArtist('WESTLIFE', '#eeb420');
    // highlightArtist('MADONNA', '#439428');
    // highlightArtist('CLIFF RICHARD', '#6b2188');
  }
  if (interaction.index===3) {
    // document.querySelector('.scroll__graphic').style.backgroundColor = "#55b4d8";
    swarm.zoomAndPan(650, 350, 8);
    // resetArtists(['WESTLIFE', 'MADONNA', 'CLIFF RICHARD', 'WET WET WET']);
    // highlightArtist('FRANKIE LAINE', '#e61c17');
  }
  if (interaction.index===4) {
    // document.querySelector('.scroll__graphic').style.backgroundColor = "#55b4d8";
    swarm.zoomAndPan(1200, 300, 7.5);
    // highlightArtist('WET WET WET', '#e61c17');
    // resetArtists(['MADONNA', 'JUSTIN BIEBER', 'TAKE THAT']);
  }
  if (interaction.index===5) {
    // document.querySelector('.scroll__graphic').style.backgroundColor = "#55b4d8";
    swarm.zoomAndPan(750, 300, 7);
    // resetArtists(['FRANKIE LAINE', 'WET WET WET']);
    // highlightArtist('JUSTIN BIEBER', '#ff6a07');
    // highlightArtist('MADONNA', '#439428');
    // highlightArtist('TAKE THAT', '#560f85');
  }
  if (interaction.index===6) {
    // document.querySelector('.scroll__graphic').style.backgroundColor = "#55b4d8";
    swarm.zoomReset();
    // resetArtists(['MADONNA', 'JUSTIN BIEBER', 'TAKE THAT']);
  }
}

function handleStepExit(interaction, steps) {
  //console.log('handleStepEnter', interaction, steps);
  //console.log(interaction.element);
  const currentStep = interaction.element;
  currentStep.classList.remove('is-active');
}

function handleContainerEnter(interaction, steps) {
  //console.log('handleStepEnter', interaction, steps);
}

function handleContainerExit(interaction, steps) {
  //console.log('handleStepEnter', interaction, steps);
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
