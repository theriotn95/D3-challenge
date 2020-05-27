
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data_j.csv").then(function(data_j) {

   
    data_j.forEach(function(data) {
      data.income = +data.income;
      data.healthcare = +data.healthcare;
    });

    
    var xLinearScale = d3.scaleLinear()
      .domain([10, d3.max(data_j, d => d.income)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([3, d3.max(data_j, d => d.healthcare)])
      .range([height, 0]);

   