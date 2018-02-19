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
        d.liveness = +d.liveness;
        d.speechiness = +d.speechiness;
        d.instrumentalness = +d.instrumentalness;
        d.duration_ms = +d.duration_ms;
    });
    config["lineChartBuilt"] = false;
  }

  buildMainGraph() {
    this.buildGraph();
    this.addAxis();
    this.initialiseLines();
    this.addInitialLines();
  }

  buildGraph() {
    const svg = d3.select("#line-chart");
    this.margin = {top: 40, right: 40, bottom: 40, left: 40};
    this.width = 600;
    this.height = 400;

    // set the ranges
    this.x = d3.scaleTime().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);

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

    var key = svg.append("g")
        .attr("class", "line-chart__key")
        .attr("transform", `translate(${svg.attr("width") * 0.8}, ${this.height * 0.4})`);
    key.append("text")
          .text("Key")
          .attr("text-decoration", "underline");
  }

  addAxis() {
    var x = this.x,
        y = this.y;
    const lineChartContainer = d3.select(".line-chart__container");
    var axistext = lineChartContainer.append("text")
         .attr("x", this.width / 2 + this.margin.left)
         .attr("y", this.height + this.margin.bottom)
         .attr("text-anchor", "middle")
         .style("font-size", "16px")
         .text('Years');

    // axis ranges
    x.domain(d3.extent(this.data, function(d) { return d.year; }));
    y.domain([0, 1]);

    // Add the X Axis
    lineChartContainer.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(this.x));

    // Add the Y Axis
    lineChartContainer.append("g")
        .call(d3.axisLeft(this.y));
  }

  initialiseLines() {
    var chart = this;
    chart.danceabilityLine = d3.line()
        .x(function(d) { return chart.x(d.year); })
        .y(function(d) { return chart.y(d.danceability); });

    chart.valenceLine = d3.line()
        .x(function(d) { return chart.x(d.year); })
        .y(function(d) { return chart.y(d.valence); });

    chart.acousticnessLine = d3.line()
        .x(function(d) { return chart.x(d.year); })
        .y(function(d) { return chart.y(d.acousticness); });

    chart.energyLine = d3.line()
        .x(function(d) { return chart.x(d.year); })
        .y(function(d) { return chart.y(d.energy); });

    chart.instrumentalLine = d3.line()
        .x(function(d) { return chart.x(d.year); })
        .y(function(d) { return chart.y(d.instrumentalness); });

    chart.speechyLine = d3.line()
        .x(function(d) { return chart.x(d.year); })
        .y(function(d) { return chart.y(d.speechiness); });

    chart.liveLine = d3.line()
        .x(function(d) { return chart.x(d.year); })
        .y(function(d) { return chart.y(d.liveness); });

    chart.durationLine = d3.line()
      .x(function(d) { return chart.x(d.year); })
      .y(function(d) { return chart.y(d.duration); });
  }

  addInitialLines() {
    var features = ["Danceability", "Valence", "Acousticness", "Energy", "Liveness", "Speechiness", "Instrumentalness"];
    var featureLines = [this.danceabilityLine, this.valenceLine, this.acousticnessLine, this.energyLine, this.liveLine, this.speechyLine, this.instrumentalLine];
    var colours = ["#ff6a07", "#27ae60", "#9b59b6", "#3498db", "#e74c3c", "#f1c40f", "#1abc9c"];
    const lineChartContainer = d3.select(".line-chart__container");
    const key = d3.select(".line-chart__key");
    for (var i = 0; i < features.length; i++) {
      lineChartContainer.append("path")
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

  addCheckboxListeners() {
    const lineChart = this;
    d3.selectAll("input[type=checkbox]").on("click", function() {
      this.checked ? lineChart.addLines([this.value]) : lineChart.removeLines([this.value]);
    });
  }

  explore() {
    const svg = d3.select("#line-chart");
    const chart = this;
    svg.call(d3.zoom().on("zoom", this.zoomed));
  }

  zoomed() {
    d3.select("#line-chart").attr("transform", d3.event.transform);
  }

}

export default LineChart;
