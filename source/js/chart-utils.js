import $ from 'jquery';
import * as d3 from "d3";
import * as d4 from 'd3-svg-annotation';
import config from './config.js';

export function zoomAndPan(graph, translateX, translateY, scale) {
  var svg = d3.select(`#${graph}`)
      .transition()
        .duration(1750)
        .attr("transform", `translate(${translateX},${translateY})scale(${scale})`);
}

export function annotate(graph, label, x, y, dx, dy) {
  // add check to see if label already exists
  const type = d4.annotationLabel

  const annotations = [{
    note: {
      title: label
    },
    x: x, y: y,
    dx: dx, dy: dy,
    connector: {end: "arrow"},
  }]

  const makeAnnotations = d4.annotation()
      .editMode(false)
      .type(d4.annotationLabel)
      .annotations(annotations)

  d3.select(`#${graph}`)
    .append("g")
    .attr("class", `${graph}--annotation-group`)
    .attr("id", `${label}_label`)
    .style('font-size', "10px")
    .call(makeAnnotations)
}

export function removeAllAnnotations(graph) {
  console.log('called remove annotations');
  var labels = document.querySelectorAll(`.${graph}--annotation-group`);
    labels.forEach((label) => {
      label.style.display = "none";
    });
}

export function zoomReset(graph) {
  console.log('zoom reset called');
  var svg = d3.select(`#${graph}`)
    .transition()
      .duration(1750)
      .attr("transform", `translate(0,0)scale(1)`);
}
