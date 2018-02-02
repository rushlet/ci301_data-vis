import $ from 'jquery';
import * as d3 from "d3";

function swarmChart() {
  var svg = d3.select("svg"),
      margin = {top: 40, right: 40, bottom: 40, left: 40},
      width = svg.attr("width") - margin.left - margin.right,
      height = svg.attr("height") - margin.top - margin.bottom;

  var formatValue = d3.format(",d");

  var x = d3.scaleLog()
      .rangeRound([0, width]);

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv(`./assets/data/unique_artists_track_count.csv`, type, function(error, data) {
    if (error) throw error;
    console.log(data);
    x.domain(d3.extent(data, function(d) {
      console.log(d);
      return d.total_weeks;
    }));
    // parse string as number - https://stackoverflow.com/questions/17601105/how-do-i-convert-strings-from-csv-in-d3-js-and-be-able-to-use-them-as-a-dataset
    data.forEach(function(d){
      console.log(d);
      d['track_count'] = +d['track_count'];
    });

    var simulation = d3.forceSimulation(data)
        .force("x", d3.forceX(function(d) { return x(d.total_weeks); }))
        .force("y", d3.forceY(height / 2))
        .force('collision', d3.forceCollide().radius(function(d) {
          return d.track_count+1
        }))
        .stop();

    for (var i = 0; i < 120; ++i) simulation.tick();

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(20, ".0s")); // +"0.s" formats as ints

    var cell = g.append("g")
        .attr("class", "cells")
      .selectAll("g").data(d3.voronoi()
          .extent([[-margin.left, -margin.top], [width + margin.right, height + margin.top]])
          .x(function(d) { return d.x; })
          .y(function(d) { return d.y; })
        .polygons(data)).enter().append("g");

    cell.append("circle")
        .attr("r", function(d) { return d.data.track_count; })
        .attr("cx", function(d) { return d.data.x; })
        .attr("cy", function(d) { return d.data.y; });

    cell.append("path")
        .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

    cell.append("title")
        .text(function(d) { return d.data.title + "\n" + formatValue(d.data.total_weeks) + " weeks at one with " + formatValue(d.data.track_count) + " tracks"; });
  });
}

function type(d) {
  if (!d.total_weeks) return;
  d.total_weeks = +d.total_weeks;
  return d;
}

export default swarmChart;
