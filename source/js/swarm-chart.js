// adapted from https://bl.ocks.org/mbostock/6526445e2b44303eebf21da3b6627320
import $ from 'jquery';
import * as d3 from "d3";
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
        .attr("y", (this.height))
        .attr("transform", "translate(0," + this.margin.bottom*1.5 + ")")
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text('Number of Weeks');

    this.zoom = d3.zoom()
        .scaleExtent([1, 40])
        .translateExtent([[-100, -100], [this.width + 90, this.height + 100]])
        .on("zoom", this.zoomed);

    this.key();
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
          .attr("transform", "translate(0," + swarm.height * 1.75 + ")")
          .call(d3.axisBottom(swarm.x).ticks(20, ".0s")); // +"0.s" formats as ints

      var cell = swarm.g.append("g")
          .attr("class", "cells")
          .attr("transform", "translate(0," + (swarm.height/2) + ")")
        .selectAll("g").data(d3.voronoi()
            .extent([[-swarm.margin.left, -swarm.margin.top], [swarm.width + swarm.margin.right, swarm.height + swarm.margin.top]])
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
          .polygons(data)).enter().append("g");

      // data.forEach(function(d, i) {
      //   swarm.defs.append("svg:pattern")
      //     .attr("id", "artist_image" + i)
      //     .attr("width", d.track_count)
      //     .attr("height", d.track_count)
      //     .attr("y", 0)
      //     .attr("x", 0)
      //     .append("svg:image")
      //     .attr("xlink:href", d.imageUrl)
      //
      //   swarm.svg.append("circle")
      //     .attr("r", d.track_count)
      //     .attr("cx", d.x)
      //     .attr("cy", d.y)
      //     .style("fill", "#000")
      //     .style("fill", "url(#artist_image" + i + ")");
      // })

      cell.attr("class", function(d) { return d.data.artist.replace(/ /g,"_"); })

      cell.append("circle")
          .attr("r", function(d) { return d.data.track_count; })
          .attr("cx", function(d) { return d.data.x; })
          .attr("cy", function(d) { return d.data.y; })
          .attr("class", function(d) { return `${d.data.artist.replace(/ /g,"_")}_circle`; })

      cell.append("path")
          .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

      cell.append("title")
          .text(function(d) { return d.data.artist + "\n" + swarm.formatValue(d.data.total_weeks) + " weeks at one with " + swarm.formatValue(d.data.track_count) + " tracks"; });
    });
  }

  key() {
    console.log('called');
    const swarm = this;
    this.svg = d3.select("#swarm-chart-key");
    this.margin = {top: 0, right: 40, bottom: 40, left: 40};
    this.width = this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = this.svg.attr("height") - this.margin.top - this.margin.bottom;
    const data = [1, 40, 80];
    const keyContainer = this.svg.append("g")
    data.forEach((d, i) => {
      console.log(d, i);
      keyContainer.append("circle")
          .attr("r", function(data) {return data; })
          .attr("cx", function(d) { return 150 * i; })
          .attr("cy", function(d) { return 50; })
          .attr("class", "key");
    })
  }

  type(d) {
    if (!d.total_weeks) return;
    d.total_weeks = +d.total_weeks;
    return d;
  }

  zoomed() {
    view.attr("transform", d3.event.transform);
    gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
    gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
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

  highlightArtistNode(artist, colour) {
    console.log('highlight node');
    d3.select(`.${artist.replace(/ /g,"_")}_circle`)
      .style("fill", colour)
   }
}

export default SwarmChart;
