import $ from 'jquery';
import * as d3 from "d3";
import * as d4 from 'd3-svg-annotation';
import config from './config.js';
import * as dataCleaner from './data-cleaner.js';

export function zoomAndPan(graph, translateX, translateY, scale) {
  const svg = d3.select(`#${graph}`)
      .transition()
        .duration(1750)
        .attr("transform", `translate(${translateX},${translateY})scale(${scale})`);
}

export function annotate(graph, label, x, y, dx, dy) {
  // check to see if label already exists
  var id = dataCleaner.underscoreString(label);
  if (document.getElementById(`${id}_label`)) {
    var existingPosition = getTranslation(d3.select(`#${id}_label .annotation-note`).attr("transform")),
    label_x = existingPosition[0],
    label_y = existingPosition[1];
    if (label_x != dx || label_y != dy) {
      document.getElementById(`${id}_label`).remove();
      makeNewLabel(graph, label, x, y, dx, dy, id);
    } else {
      d3.select(`#${id}_label`)
        .attr("x", x)
        .attr("y", y)
        .style('display', 'block');

      d3.select(`#${id}_label .annotation-note`)
        .attr("transform", `translate(${dx}, ${dy})`);
    }
  } else {
    makeNewLabel(graph, label, x, y, dx, dy, id);
  }
}

function makeNewLabel(graph, label, x, y, dx, dy, id) {
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
    .attr("id", `${id}_label`)
    .style('font-size', "10px")
    .call(makeAnnotations)
}

// https://stackoverflow.com/questions/38224875/replacing-d3-transform-in-d3-v4
function getTranslation(transform) {
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttributeNS(null, "transform", transform);
  var matrix = g.transform.baseVal.consolidate().matrix;
  return [matrix.e, matrix.f];
}

export function removeAllAnnotations(graph) {
  var labels = document.querySelectorAll(`.${graph}--annotation-group`);
    labels.forEach((label) => {
      label.style.display = "none";
    });
}

export function zoomReset(graph) {
  const svg = d3.select(`#${graph}`)
    .transition()
      .duration(1750)
      .attr("transform", `translate(0,0)scale(1)`);
}

export function explore(graph) {
  console.log('explore called');
  d3.select(`#${graph}`).call(d3.zoom()
  .scaleExtent([0.8, 10])
  .on("zoom", () => {
    d3.select(`#${graph}`).attr("transform", d3.event.transform);
  }));
}

export function disableExplore(graph) {
  console.log('explore called');
  d3.select(`#${graph}`).call(d3.zoom()
  .scaleExtent([0.8, 10]));
}
