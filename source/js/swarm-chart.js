// adapted from https://bl.ocks.org/mbostock/6526445e2b44303eebf21da3b6627320
import $ from 'jquery';
import * as d3 from "d3";
import * as d4 from 'd3-svg-annotation';
var zoom = d3.zoom();

class SwarmChart {
  constructor() {
    this.svg = d3.select("#swarm-chart");
    this.margin = {top: 40, right: 40, bottom: 50, left: 40};
    this.width = this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = this.svg.attr("height") - this.margin.top - this.margin.bottom;

    this.formatValue = d3.format(",d");

    this.x = d3.scaleLinear()
        .domain([0, this.width])
        .rangeRound([0, this.width]);

    this.g = this.svg.append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

  this.title = this.svg.append("text")
      .attr("x", this.width / 2 + this.margin.left)
      .attr("y", (this.margin.top/1.75))
      .attr("text-anchor", "middle")
      .style("font-size", "30px")
      .text('Artists: Number of tracks and time at 1');

    this.axistext = this.svg.append("text")
        .attr("x", this.width / 2 + this.margin.left)
        .attr("y", 315)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text('Total Weeks at 1');

    // this.key = this.svg.append("g")
    //       .attr("transform", "translate(0," + this.height + ")");
    // const keyData = [7.5, 10, 15];
    // const keyContainer = this.key.append("g");
    // keyData.forEach((d, i) => {
    //   this.key.append("circle")
    //       .attr("r", d)
    //       .attr("cx", this.width/2 + d*(i+2))
    //       .attr("cy", 0)
    //       .attr("class", "key");
    // });
    // this.key.append("text")
    //     .text("Fewer Tracks")
    //     .attr("y", 50)
    //
    // this.key.append("text")
    //     .text("More Tracks")
  }

  swarmChart() {
    let swarm = this;
    d3.csv("./assets/data/unique_artists_track_count.csv", this.type, function(error, data) {
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
          .attr("transform", "translate(0," + (swarm.height*0.55) + ")")
          .call(d3.axisBottom(swarm.x).ticks(20, ".0s")); // +"0.s" formats as ints

      var cell = swarm.g.append("g")
          .attr("class", "cells")
          .attr("transform", "translate(0," + -swarm.margin.bottom + ")")
        .selectAll("g").data(d3.voronoi()
            .extent([[-swarm.margin.left, -swarm.margin.top], [swarm.width + swarm.margin.right, 300]])
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
          .polygons(data)).enter().append("g");

      cell.attr("class", function(d) { return d.data.artist.replace(/ /g,"_"); })

      var defs = swarm.svg.append('svg:defs');
      data.forEach(function(d, i) { //this isn't the d3 way to do this -> once working, will need refactoring
          defs.append("svg:pattern")
              .attr("id", "artist_image" + d.artist.replace(/ /g,"_"))
              .attr("width", "100%")
              .attr("height", "100%")
              .attr("x", d.imageWidth)
              .attr("y", d.imageHeight)
              .append("svg:image")
              .attr("xlink:href", d.imageUrl)
              .attr("width", d.track_count * 4)
              .attr("height", d.track_count * 4);

            // var circle = swarm.g.append("circle")
            //   .attr("cx", d.x)
            //   .attr("cy", d.y)
            //   .attr("r", d.track_count)
            //   .style("fill", "#000")
            //   .style("fill", "url(#artist_image" + i + ")");
       })

       // swarm.svg.append("svg:defs").selectAll("marker")
       //   .data(data)
       //   .enter().append("svg:marker")
       //   .attr("id", function(d) { return "artist_image_" + d.artist.replace(/ /g,"_"); })
       //   .attr("width", "100%")
       //   .attr("height", "100%")
       //   .attr("x", function(d) { return d.imageWidth })
       //   .attr("y", function(d) { return d.imageHeight })
       //   .append("svg:image")
       //   .attr("xlink:href", function(d) { return d.imageUrl })
       //   .attr("width", function(d) { return d.track_count * 4 })
       //   .attr("height", function(d) { return d.track_count * 4 });

      cell.append("circle")
          .attr("r", function(d) { return d.data.track_count; })
          .attr("cx", function(d) { return d.data.x; })
          .attr("cy", function(d) { return d.data.y; })
          .attr("id", function(d) { return `${d.data.artist.replace(/ /g,"_")}_circle`; })
          .style("fill", "#000")
          .style("stroke", "#bfbfbf")
          .style("stroke-opacity", 0.5)
          .style("stroke-width", 0.5)
          .style("fill", function(d) { return "url(#artist_image" + d.data.artist.replace(/ /g,"_") + ")"; });

      cell.append("path")
          .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

      cell.append("title")
          .text(function(d) { return d.data.artist + "\n" + swarm.formatValue(d.data.total_weeks) + " weeks at one with " + swarm.formatValue(d.data.track_count) + " tracks"; });
    });
  }

  type(d) {
    if (!d.total_weeks) return;
    d.total_weeks = +d.total_weeks;
    return d;
  }

  zoomAndPan(translateX, translateY, scale) {
    console.log('zoom swarm called');
    var svg = d3.select("#swarm-chart")
        .transition()
          .duration(1750)
          .attr("transform", `translate(${translateX},${translateY})scale(${scale})`);
  }

  zoomReset() {
    console.log('zoom reset called');
    var svg = d3.select("#swarm-chart")
      .transition()
        .duration(1750)
        .attr("transform", `translate(0,0)scale(1)`);
  }

  highlightArtistNode(artist, x, y, dx, dy) {
    // add check to see if label already exists
    const type = d4.annotationLabel

    const annotations = [{
      note: {
        title: artist
      },
      x: x, y: y,
      dx: dx, dy: dy,
      connector: {end: "arrow"},
    }]

    const makeAnnotations = d4.annotation()
        .editMode(false)
        .type(d4.annotationLabel)
        .annotations(annotations)

    d3.select("#swarm-chart")
      .append("g")
      .attr("class", "annotation-group")
      .attr("id", `${artist.replace(/ /g,"_")}_label`)
      .style('font-size', "10px")
      .call(makeAnnotations)
  }

  removeAllAnnotations() {
    var labels = document.querySelectorAll('.annotation-group');
      labels.forEach((label) => {
        label.style.display = "none";
      });
  }
}

export default SwarmChart;
