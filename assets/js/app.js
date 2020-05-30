function create_chart(){

var svgWidth = 960;
var svgHeight = 550;

var margin = {
  top: 25,
  right: 50,
  bottom: 90,
  left: 100
};

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
    var svg = d3.select('#scatter')
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Import Data
d3.csv("assets/data/data_j.csv").then(function(data_j) {
  
     
data_j.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
});
      
var xLinearScale = d3.scaleLinear()
.domain([2, d3.max(data_j, d => d.healthcare)])
.range([0, width]);
  
var yLinearScale = d3.scaleLinear()
.domain([20, d3.max(data_j, d => d.obesity)])
.range([height, 0]);
  
      // Step 3: Create axis functions
      // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
      // Step 4: Append Axes to the chart
      // ==============================
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
  
    chartGroup.append("g")
    .call(leftAxis);
  
    //Create circles for data points 
    var circles_states = chartGroup.selectAll("circle")
        .data(data_j)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.healthcare))
        .attr("cy", d => yLinearScale(d.obesity))
        .attr("r", 10)
        .attr("fill", "teal")
        .attr("opacity", "0.6")
        .attr("stroke-width", "1")
        .attr("stroke", "black");
    
        // Create text state abbreviations in chart.
    var circles_states = chartGroup.selectAll()
        .data(data_j)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.healthcare))
        .attr("y", d => yLinearScale(d.obesity))
        .attr("fill", "black")
        .attr("font-size", "10px")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .text(d => d.abbr);

        
  
 //Labels for the plot
 chartGroup.append("text")
 .attr("transform", "rotate(-90)")
 .attr("y", 0 - 50)
 .attr("x", 0 -250)
 .attr("dy", "1em")
 .attr("class", "axisText")
 .text("Obese Population (%)");

chartGroup.append("text")
 .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 27})`)
 .attr("class", "axisText")
 .text("Lacks Healthcare(%)");
      
  
    });
    }           

    create_chart();