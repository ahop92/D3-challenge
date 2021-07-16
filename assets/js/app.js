//Establish the width and height of the wrapper
var svgWidth = 960;
var svgHeight = 500;

//Establish the margins of the wrapper
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100,
};

//Establish the width and height of the chart using the margins and svg dimensions
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Define svg wrapper and append svg group that will hold the chart
//Shift the chart by a measure of the top and left margins
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr(width, svgWidth)
  .attr(height, svgHeight);

//Append group to svg
var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Initialize x and y axes for when the page opens
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

//Function definition used to update x-scale varaible on click of x-axis label
function xScale(data, chosenXAxis) {
  var xLinearScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (rawData) => rawData[chosenXAxis]) * 0.8,
      d3.max(data, (rawData) => rawData[chosenXAxis]) * 1.2,
    ])
    .range([0, width]);

  return xLinearScale;
}

//Function definition to update xAxis variable once the new axis is clicked
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition().duration(1000).call(bottomAxis);

  return xAxis;
}

function renderStates(stateCircles, newXScale, chosenXAxis) {
  stateCircles
    .transition()
    .duration(1000)
    .attr("cx", (rawData) => newXScale(rawData[chosenXAxis]));

  return stateCirlces;
}

function updateToolTip(chosenXAxis, stateCirlces){

var label;

if (chosenXAxis === "poverty") {
    label = "Poverty (%):";
  }
  else if (chosenXAxis === "age") {
    label = "Age (Median):";
  }
  else {
    label = "Household Income (Median):";
  }


}
