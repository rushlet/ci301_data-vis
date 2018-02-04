// https://bl.ocks.org/mbostock/6526445e2b44303eebf21da3b6627320
import $ from 'jquery';
import * as d3 from "d3";

class SwarmChart {
  constructor() {
    this.svg = d3.select("#swarm-chart");
    this.margin = {top: 40, right: 40, bottom: 40, left: 40};
    this.width = this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = this.svg.attr("height") - this.margin.top - this.margin.bottom;

    this.formatValue = d3.format(",d");

    this.x = d3.scaleLinear()
        .domain([0, this.width])
        .rangeRound([0, this.width]);

    this.g = this.svg.append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

  }

  swarmChart() {
    let swarm = this;
    d3.csv(`./assets/data/unique_artists_track_count.csv`, this.type, function(error, data) {
      if (error) throw error;
      swarm.x.domain(d3.extent(data, function(d) {
        return d.total_weeks;
      }));
      // parse string as number - https://stackoverflow.com/questions/17601105/how-do-i-convert-strings-from-csv-in-d3-js-and-be-able-to-use-them-as-a-dataset
      data.forEach(function(d){
        d['track_count'] = +d['track_count'];
        d['imageWidth'] = +d['imageWidth'];
        d['imageHeight'] = +d['imageHeight'];
      });

      var simulation = d3.forceSimulation(data)
          .force("x", d3.forceX(function(d) { return swarm.x(d.total_weeks); }))
          .force("y", d3.forceY(swarm.height / 2))
          .force('collision', d3.forceCollide().radius(function(d) {
            return d.track_count+1
          }))
          .stop();

      for (var i = 0; i < 120; ++i) simulation.tick();

      swarm.g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + swarm.height + ")")
          .call(d3.axisBottom(swarm.x).ticks(20, ".0s")); // +"0.s" formats as ints

      var cell = swarm.g.append("g")
          .attr("class", "cells")
        .selectAll("g").data(d3.voronoi()
            .extent([[-swarm.margin.left, -swarm.margin.top], [swarm.width + swarm.margin.right, swarm.height + swarm.margin.top]])
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
          .polygons(data)).enter().append("g");

      // var defs = svg.append('svg:defs');
      // data.forEach(function(d, i) {
      //   defs.append("svg:pattern")
      //     .attr("id", "artist_image" + i)
      //     .attr("width", d.track_count)
      //     .attr("height", d.track_count)
      //     .attr("y", 0)
      //     .attr("x", 0)
      //     .append("svg:image")
      //     .attr("xlink:href", d.imageUrl)
      //
      //   var circle = svg.append("circle")
      //     .attr("r", d.track_count)
      //     .attr("cx", d.x)
      //     .attr("cy", d.y)
      //     .style("fill", "#000")
      //     .style("fill", "url(#artist_image" + i + ")");
      // })

      cell.append("circle")
          .attr("r", function(d) { return d.data.track_count; })
          .attr("cx", function(d) { return d.data.x; })
          .attr("cy", function(d) { return d.data.y; });


      cell.append("path")
          .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

      cell.append("title")
          .text(function(d) { return d.data.artist + "\n" + swarm.formatValue(d.data.total_weeks) + " weeks at one with " + swarm.formatValue(d.data.track_count) + " tracks"; });
    });
    // var dispatch = d3.dispatch(["swarm_1", "swarm_2", "swarm_3"]);
    // dispatch.on("swarm_1", () => {
    //   console.log('swarm 1');
    // });
    // dispatch.on("swarm_2", () => {
    //   console.log('swarm 2');
    // });
    // dispatch.on("swarm_3", () => {
    //   console.log('swarm 3');
    // });
  }

  type(d) {
    if (!d.total_weeks) return;
    d.total_weeks = +d.total_weeks;
    return d;
  }

  zoomIn() {
    console.log('zoom swarm called');
    var svg = d3.select("#swarm-chart")
        .attr("transform", "scale(4)");
  }

  zoomReset() {
    console.log('zoom reset called');
    var svg = d3.select("#swarm-chart")
        .attr("transform", "scale(1)");
  }
}

export default SwarmChart;
