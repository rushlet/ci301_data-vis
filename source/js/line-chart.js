import $ from 'jquery';
import * as d3 from "d3";
import * as d4 from 'd3-svg-annotation';
import config from './config.js';

class LineChart {
  constructor() {
    // Get the data
    this.data = config["yearlyAverages"];
    // format the data
    var parseTime = d3.timeParse("%Y");
    this.data.forEach(function(d) {
        d.year = parseTime(d.year);
        d.danceability = +d.danceability;
        d.valence = +d.valence;
        d.acousticness = +d.acousticness;
        d.energy = +d.energy;
    });
    config["lineChartBuilt"] = false;
  }

  buildGraph() {
    const svg = d3.select("#line-chart");
    this.margin = {top: 40, right: 40, bottom: 40, left: 40};
    this.width = 600;
    this.height = 400;

    // set the ranges
    var x = d3.scaleTime().range([0, this.width]);
    var y = d3.scaleLinear().range([this.height, 0]);

    svg.attr("width", 900)
        .attr("height", 600)
    svg.g = svg.append("g")
        .attr("class", "line-chart__container")
        .attr("height", this.height)
        .attr("width", this.width)
        .attr("transform", `translate(${(svg.attr("width") * 0.1)}, ${(svg.attr("height") - this.height) /2})`);

    var title = svg.append("text")
        .attr("x", svg.attr("width") / 2)
        .attr("y", this.margin.top * 1.5)
        .attr("margin-bottom", this.margin.bottom)
        .attr("text-anchor", "middle")
        .style("font-size", "30px")
        .text('Average Audio Features by Year');

   var axistext = svg.g.append("text")
        .attr("x", this.width / 2 + this.margin.left)
        .attr("y", this.height + this.margin.bottom)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text('Years');

    var danceabilityLine = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.danceability); });

    var valenceLine = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.valence); });

    var acousticnessLine = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.acousticness); });

    var energyLine = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.energy); });

    // axis ranges
    x.domain(d3.extent(this.data, function(d) { return d.year; }));
    y.domain([0, 1]);

    var features = ["Danceability", "Valence", "Acousticness", "Energy"];
    var featureLines = [danceabilityLine, valenceLine, acousticnessLine, energyLine];
    var colours = ["#ff6a07", "#27ae60", "#9b59b6", "#3498db"];
    var key = svg.append("g")
        .attr("class", "line-chart__key")
        .attr("transform", `translate(${svg.attr("width") * 0.85}, ${this.height * 0.4})`);
    key.append("text")
          .text("Key")
          .attr("text-decoration", "underline");

    for (var i = 0; i < features.length; i++) {
      svg.g.append("path")
          .data([this.data])
          .attr("class", `line-chart__line, line-chart__${features[i].toLowerCase()}`)
          .style("stroke", colours[i])
          .style("fill", "none")
          .style("stroke-width", 2)
          .attr("d", featureLines[i]);

      key.append("line")
            .attr("x1", 5)
            .attr("y1", (i * 20) + 20)
            .attr("x2", 15)
            .attr("y2", (i * 20) + 20)
            .attr("stroke-width", 3)
            .attr("stroke", colours[i])
            .attr("class", `line-chart__key, line-chart__${features[i].toLowerCase()}`);
      key.append("text")
            .text(features[i])
            .attr("x", 20)
            .attr("y", (i * 20) + 25)
            .attr("class", `line-chart__${features[i].toLowerCase()}`);
    }

    // Add the X Axis
    svg.g.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.g.append("g")
        .call(d3.axisLeft(y));

    config["lineChartBuilt"] = true;
  }

  removeLines(featuresToRemove) {
    var lineChartEl = document.getElementById("line-chart");
    featuresToRemove.forEach((feature) => {
      var featureElements = lineChartEl.querySelectorAll(`.line-chart__${feature}`);
      featureElements.forEach((el) => {
        el.style.display = 'none';
      })
    })
  }

  addLines(featuresToAdd) {
    var lineChartEl = document.getElementById("line-chart");
    featuresToAdd.forEach((feature) => {
      var featureElements = lineChartEl.querySelectorAll(`.line-chart__${feature}`);
      featureElements.forEach((el) => {
        el.style.display = 'initial';
      })
    })
  }
}

export default LineChart;
