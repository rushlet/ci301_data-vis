import $ from 'jquery';
import * as d3 from "d3";
import * as d4 from 'd3-svg-annotation';
import config from './config.js';

class LineChart {
  constructor() {
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

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

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#line-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

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
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "blue")
        .attr("d", danceabilityLine);

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", valenceLine);

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "orange")
        .attr("d", acousticLine);

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "purple")
        .attr("d", energyLine);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

  }
}

export default LineChart;
