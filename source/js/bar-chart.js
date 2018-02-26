import * as d3 from "d3";
import config from './config.js';
import * as dataCleaner from './data-cleaner.js';

class BarChart {
  constructor() {
    this.svg = d3.select("#bar-chart");
    this.margin = {top: 20, right: 20, bottom: 30, left: 40};
    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;

    this.x = d3.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3.scaleLinear().rangeRound([this.height, 0]);

    this.g = this.svg.append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  drawBars() {
    let data = dataCleaner.cleanDataForBarChart();
    let barChart = this,
          y = barChart.y,
          x = barChart.x;
    console.log(config['personalisation-feature']);
    data.forEach((d) => {
      x.domain(data.map(function(d) { return d.title; }));
      y.domain([0, 1]);

      barChart.g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + barChart.height + ")")
          .call(d3.axisBottom(x));

      barChart.g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10, "%"))
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");

      barChart.g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.title); })
          .attr("y", function(d) { return y(d.features[`${config['personalisation-feature']}`]); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return barChart.height - y(d.features[`${config['personalisation-feature']}`]); });
    });
  }

  removeBars() {
    let chart = d3.select("#bar-chart");
    chart.selectAll(".bar")
  					.remove()
  					.exit()
            .data(dataCleaner.cleanDataForBarChart());

    chart.selectAll("text")
  					.remove()
  					.exit()
            .data(dataCleaner.cleanDataForBarChart());

    chart.selectAll(".tick")
  					.remove()
  					.exit()
            .data(dataCleaner.cleanDataForBarChart());
  }
}

export default BarChart;
