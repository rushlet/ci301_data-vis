import * as d3 from "d3";
import $ from 'jquery';
import scrollama from 'scrollama';

const scroller = scrollama();
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

function handleStepEnter(interaction, steps) {
  console.log('handleStepEnter', interaction, steps);
  console.log(interaction.element);
  const currentStep = interaction.element;
  currentStep.classList.add('is-active');
  if (interaction.index===0) {
    document.querySelector('.scroll__graphic').style.backgroundImage = "url(assets/img/bubble.png)"
  }
  if (interaction.index===1) {
    document.querySelector('.scroll__graphic').style.backgroundImage = "url(assets/img/bubble1.png)"
  }
  if (interaction.index===2) {
    document.querySelector('.scroll__graphic').style.backgroundImage = "url(assets/img/swarm.png)"
  }
}

function handleStepExit(interaction, steps) {
  console.log('handleStepEnter', interaction, steps);
  console.log(interaction.element);
  const currentStep = interaction.element;
  currentStep.classList.remove('is-active');
}

function handleContainerEnter(interaction, steps) {
  console.log('handleStepEnter', interaction, steps);
}

function handleContainerExit(interaction, steps) {
  console.log('handleStepEnter', interaction, steps);
}

export default scroller;
