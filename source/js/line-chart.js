import $ from 'jquery';
import * as d3 from "d3";
import * as d4 from 'd3-svg-annotation';
import config from './config.js';

class LineChart {
  constructor() {
    var svg = d3.select("#line-chart"),
        margin = {top: 40, right: 40, bottom: 40, left: 40},
        width = 600,
        height = 400;

    // parse the date / time
    var parseTime = d3.timeParse("%Y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var danceabilityLine = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.danceability); });

    var valenceLine = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.valence); });

    var acousticLine = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.acousticness); });

    var energyLine = d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.energy); });

    svg.attr("width", 900)
        .attr("height", 600)
    svg.g = svg.append("g")
        .attr("class", "line-chart__container")
        .attr("height", height)
        .attr("width", width)
        .attr("transform", `translate(${(svg.attr("width") - width)/ 4}, ${(svg.attr("height") - height) /2})`);

     var title = svg.append("text")
         .attr("x", svg.attr("width") / 2)
         .attr("y", margin.top * 1.5)
         .attr("margin-bottom", margin.bottom)
         .attr("text-anchor", "middle")
         .style("font-size", "30px")
         .text('Average Audio Features by Year');

    var axistext = svg.g.append("text")
         .attr("x", width / 2 + margin.left)
         .attr("y", height + margin.bottom)
         .attr("text-anchor", "middle")
         .style("font-size", "16px")
         .text('Years');

    // Get the data
    var data = config["yearlyAverages"];
    console.log(data);
    // format the data
    data.forEach(function(d) {
        d.year = parseTime(d.year);
        d.danceability = +d.danceability;
        d.valence = +d.valence;
        d.acousticness = +d.acousticness;
        d.energy = +d.energy;
    });

    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, 1]);

    // add the lines
    svg.g.append("path")
        .data([data])
        .attr("class", "line-chart__line")
        .style("stroke", "blue")
        .attr("d", danceabilityLine);

    svg.g.append("path")
        .data([data])
        .attr("class", "line-chart__line")
        .style("stroke", "red")
        .attr("d", valenceLine);

    svg.g.append("path")
        .data([data])
        .attr("class", "line-chart__line")
        .style("stroke", "orange")
        .attr("d", acousticLine);

    svg.g.append("path")
        .data([data])
        .attr("class", "line-chart__line")
        .style("stroke", "purple")
        .attr("d", energyLine);

    // Add the X Axis
    svg.g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.g.append("g")
        .call(d3.axisLeft(y));


    // key

    var features = ["Danceability", "Valence", "Acousticness", "Energy"];
    var colours = ["blue", "red", "orange", "purple"];
    var key = svg.append("g")
        .attr("class", "line-chart__key")
        .attr("transform", `translate(${svg.attr("width") * 0.85}, ${height * 0.4})`);
    key.append("text")
          .text("Key")
          .attr("text-decoration", "underline");
    for (var i = 0; i < features.length; i++) {
      key.append("line")
            .attr("x1", 5)
            .attr("y1", (i * 20) + 20)
            .attr("x2", 15)
            .attr("y2", (i * 20) + 20)
            .attr("stroke-width", 3)
            .attr("stroke", colours[i]);
      key.append("text")
            .text(features[i])
            .attr("x", 20)
            .attr("y", (i * 20) + 25);
    }
  }
}

export default LineChart;
