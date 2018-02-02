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
  //console.log('handleStepEnter', interaction, steps);
  //console.log(interaction.element);
  const currentStep = interaction.element;
  currentStep.classList.add('is-active');
  if (interaction.index===0) {
    document.querySelector('.scroll__graphic').style.backgroundColor = "#fff"
  }
  if (interaction.index===1) {
    document.querySelector('.scroll__graphic').style.backgroundColor = "#f5a62a"
  }
  if (interaction.index===2) {
    document.querySelector('.scroll__graphic').style.backgroundColor = "#55b4d8"
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

export default scroller;
