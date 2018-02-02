/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	// import * as d3 from "d3";
	// import $ from 'jquery';
	// // import * as SpotifyWebApi from 'spotify-web-api-node';
	// import SpotifyAuth from './spotify_auth.js'
	// //
	// // console.log(SpotifyWebApi);
	// // console.log(SpotifyAuth);
	// // var auth = SpotifyAuth();
	//
	// let dataset = "source/assets/data/fixed_data_for_analysis.json"
	// $.getJSON(dataset).done(dataset=> {
	//     start(dataset);
	// });
	//
	// function start(dataset) {
	//   let eminemData = [];
	//   dataset.forEach((track) => {
	//     let artist = track.artist.toString();
	//     if (artist.includes("EMINEM")) {
	//       eminemData.push(track);
	//     }
	//   })
	//   createGraph(eminemData);
	// }
	//
	// function createGraph(eminemData) {
	//   console.log(eminemData);
	//   var w = 300;
	//   var h = 100;
	//   var padding = 2;
	//   var graphData = [];
	//   eminemData.forEach((track) => {
	//     graphData.push(parseFloat(track.danceability));
	//   });
	//   console.log(graphData);
	//
	//   var svg = d3.select(".graph").append("svg")
	//               .attr('width', w)
	//               .attr('height', h);
	//   svg.selectAll('rect')
	//     .data(graphData)
	//     .enter()
	//       .append('rect')
	//       .attr("x", function(d, index) {return index * (w / graphData.length);})
	//       .attr("y", function(d) { return h - (d*40);})
	//       .attr("width", (w / graphData.length - padding))
	//       .attr("height", function(d) {return (d*100);})
	//       .attr("fill", function(d) {return `rgb(${parseInt(d*50)}, ${parseInt(d*150)}, 0)`;});
	//
	//   var text = svg.selectAll("text")
	//                           .data(eminemData)
	//                           .enter()
	//                           .append("text")
	//   var textLabels = text
	//                     .attr("x", function(d, index) {return index * (w / eminemData.length);})
	//                     .attr("y", 100)
	//                     .text(function (d){return d.title})
	//                     .attr("font-family", "sans-serif")
	//                     .attr("font-size", "20px")
	//                     .attr("fill", "red");
	//                     // .attr("transform", "rotate(180)");
	// }
	"use strict";

/***/ })
/******/ ]);