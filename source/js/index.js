import * as d3 from "d3";
import $ from 'jquery';

let dataset = "http://gsx2json.com/api?id=1KfV5BohkeZMAjMWHBua23O02rP6EGCMDNUgySNuMhQo&integers=FALSE"
$.getJSON(dataset).done(dataset=> {
    start(dataset);
});

function start(dataset) {
  let eminemData = [];
  dataset.rows.forEach((track) => {
    let artist = track.artist.toString();
    if (artist.includes("EMINEM")) {
      eminemData.push(track);
    }
  })
  createGraph(eminemData);
}

function createGraph(eminemData) {
  console.log(eminemData);
  var w = 300;
  var h = 100;
  var padding = 2;
  var graphData = [];
  eminemData.forEach((track) => {
    graphData.push(parseFloat(track.danceability));
  });
  console.log(graphData);

  var svg = d3.select(".graph").append("svg")
              .attr('width', w)
              .attr('height', h);
  svg.selectAll('rect')
    .data(graphData)
    .enter()
      .append('rect')
      .attr("x", function(d, index) {return index * (w / graphData.length);})
      .attr("y", function(d) { return h - (d*40);})
      .attr("width", (w / graphData.length - padding))
      .attr("height", function(d) {return (d*100);})
      .attr("fill", function(d) {return `rgb(${parseInt(d*50)}, ${parseInt(d*150)}, 0)`;});

  var text = svg.selectAll("text")
                          .data(eminemData)
                          .enter()
                          .append("text")
  var textLabels = text
                    .attr("x", function(d, index) {return index * (w / eminemData.length);})
                    .attr("y", 100)
                    .text(function (d){return d.title})
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "20px")
                    .attr("fill", "red");
                    // .attr("transform", "rotate(180)");
}
