//Establish the width and height of the wrapper
var svgWidth = 960;
var svgHeight = 500;

//Establish the margins of the wrapper
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 85,
};

//Establish the width and height of the chart using the margins and svg dimensions
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Define svg wrapper and append svg group that will hold the chart
//Shift the chart by a measure of the top and left margins
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

//Append group to svg
var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Initialize x and y axes for initial data settings on page
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

    // console.log(xLinearScale)

  return xLinearScale;
}
//Function definition used to update x-scale varaible on click of x-axis label
function yScale(data, chosenYAxis) {
  var yLinearScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (rawData) => rawData[chosenYAxis]) * 0.8,
      d3.max(data, (rawData) => rawData[chosenYAxis]) * 1.2,
    ])
    .range([height, 0]);

  return yLinearScale;
}
//Function definition to update xAxis variable once the new axis is clicked
function renderXAxis(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition().duration(1000).call(bottomAxis);

  return xAxis;
}

function renderYAxis(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition().duration(1000).call(leftAxis);

  return yAxis;
}

//Function definition to re-locate the state circles according to the selected axes
function renderStates(
  stateCircles,
  newXScale,
  chosenXAxis,
  newYScale,
  chosenYAxis
) {
  stateCircles
    .transition()
    .duration(1000)
    .attr("cx", (rawData) => newXScale(rawData[chosenXAxis]))
    .attr("cy", (rawData) => newYScale(rawData[chosenYAxis]));

  return stateCircles;
}

function updateToolTip(chosenXAxis, chosenYAxis, stateCircles) {
  var xlabel;
  var ylabel;

  if (chosenXAxis === "poverty") {
    xlabel = "Poverty (%):";
  } else if (chosenXAxis === "age") {
    xlabel = "Age (Median):";
  } else {
    xlabel = "Household Income (Median):";
  }

  if (chosenYAxis === "healthcare") {
    ylabel = "Lacks Healthcare (%):";
  } else if (chosenXAxis === "obesity") {
    ylabel = "Obesity (%):";
  } else {
    ylabel = "Smokes (%):";
  }

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.state}<br><br>${xlabel} ${d[chosenXAxis]}`);
    });

    stateCircles.call(toolTip);

    stateCircles
    .on("mouseover", function (stateData) {
      toolTip.show(stateData);
    })
    .on("mouseout", function (stateData, index) {
      toolTip.hide(stateData);
    });

  return stateCircles;
}

function updateCircleText(circleText, chosenXAxis, xScale, chosenYAxis, yScale){

  circleText
  .transition()
  .duration(1000)
  .attr("x", (d) => xScale(d[chosenXAxis]))
  .attr("y", (d) => yScale(d[chosenYAxis]))
  .attr("dy", "0.45em")
  .style("font-family", "arial")
  .style("font-size", "10px")
  .style("text-anchor", "middle");

  return circleText;

}

d3.csv("../../assets/data/data.csv").then(function (rawData, err) {
  if (err) throw err;

  //Parse values
  rawData.forEach(function (data) {
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.income = +data.income;
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
  });

  console.log(rawData);
  console.log(`Data import and parsing: complete.`);

  // Call functions xScale and yScale to update the linear scales for both x and y with the user selected axes.
  var xLinearScale = xScale(rawData, chosenXAxis);
  var yLinearScale = yScale(rawData, chosenYAxis);

  //Apply the output from xScale and yScale to the page using D3
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  //Append both of the axes to the chartGroup and set equal to a variable that can be re-adjusted when a new axis is selected
  var xAxis = chartGroup
    .append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  var yAxis = chartGroup.append("g").call(leftAxis);

  // Create group for three x-axis labels
  var xLabelGroup = chartGroup
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var povertyLabel = xLabelGroup
    .append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("Poverty Rate (%)");

  var ageLabel = xLabelGroup
    .append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age (Median)");

  var incomeLabel = xLabelGroup
    .append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Household Income (Median)");

  //Create group for three y-axis labels
  var yLabelGroup = chartGroup.append("g").attr("transform", "rotate(-90)");

  var healthcareLabel = yLabelGroup
    .append("text")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("value", "healthcare") // value to grab for event listener
    .classed("active", true)
    .text("Lacks Healthcare (%)");

  var smokeLabel = yLabelGroup
    .append("text")
    .attr("y", -50)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("value", "smokes") // value to grab for event listener
    .classed("inactive", true)
    .text("Smokes (%)");

  var obeseLabel = yLabelGroup
    .append("text")
    .attr("y", -70)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("value", "obesity") // value to grab for event listener
    .classed("inactive", true)
    .text("Obesity (%)");

  //Create initial circles for states
  //Reference: https://www.educative.io/edpresso/how-to-create-a-bubble-chart-using-d3
  //Reference: https://bl.ocks.org/alokkshukla/3d6be4be0ef9f6977ec6718b2916d168
  var stateCircles = chartGroup.selectAll("g circle").data(rawData).enter();

    var circles = stateCircles
    .append("circle")
    .attr("cx", (d) => xLinearScale(d[chosenXAxis]))
    .attr("cy", (d) => yLinearScale(d[chosenYAxis]))
    .attr("r", 13)
    .attr("fill", "indigo")
    .attr("opacity", ".5");

    var stateCircleText = stateCircles.append("text")
    .text(function (d) {
      return d.abbr;
    })
    .attr("x", (d) => xLinearScale(d[chosenXAxis]))
    .attr("y", (d) => yLinearScale(d[chosenYAxis]))
    .attr("dy", "0.45em")
    .style("font-family", "arial")
    .style("font-size", "10px")
    .style("text-anchor", "middle");

  // updateToolTip function above csv import
  // var circles = updateToolTip(chosenXAxis, chosenYAxis, circles);

  xLabelGroup.selectAll("text").on("click", function () {
    // get value of selection
    var value = d3.select(this).attr("value");
    if (value !== chosenXAxis) {
      // replaces chosenXAxis with value
      chosenXAxis = value;

      // console.log(chosenXAxis)

      // functions here found above csv import
      // updates x scale for new data
      xLinearScale = xScale(rawData, chosenXAxis);

      // updates x axis with transition
      xAxis = renderXAxis(xLinearScale, xAxis);

      // updates circles with new x values
      circles = renderStates(
        circles,
        xLinearScale,
        chosenXAxis,
        yLinearScale,
        chosenYAxis
      );

      stateCircleText = updateCircleText(stateCircleText, chosenXAxis, xLinearScale, chosenYAxis, yLinearScale);

      // updates tooltips with new info
      // circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

      // changes classes to change bold text
      if (chosenXAxis === "poverty") {
        povertyLabel.classed("active", true).classed("inactive", false);
        ageLabel.classed("active", false).classed("inactive", true);
        incomeLabel.classed("active", false).classed("inactive", true);
      } else if (chosenXAxis === "age") {
        ageLabel.classed("active", true).classed("inactive", false);
        incomeLabel.classed("active", false).classed("inactive", true);
        povertyLabel.classed("active", false).classed("inactive", true);
      } else {
        incomeLabel.classed("active", true).classed("inactive", false);
        povertyLabel.classed("active", false).classed("inactive", true);
        ageLabel.classed("active", false).classed("inactive", true);
      }
    }
  });

  yLabelGroup.selectAll("text").on("click", function () {
    // get value of selection
    var value = d3.select(this).attr("value");
    if (value !== chosenYAxis) {
      // replaces chosenXAxis with value
      chosenYAxis = value;

      // console.log(chosenYAxis)

      // functions here found above csv import
      // updates x scale for new data
      yLinearScale = yScale(rawData, chosenYAxis);

      // updates x axis with transition
      yAxis = renderYAxis(yLinearScale, yAxis);

      // updates circles with new x values
      circles = renderStates(
        circles,
        xLinearScale,
        chosenXAxis,
        yLinearScale,
        chosenYAxis
      );

      stateCircleText = updateCircleText(stateCircleText, chosenXAxis, xLinearScale, chosenYAxis, yLinearScale);

      // updates tooltips with new info
      // circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

      // changes classes to change bold text
      if (chosenYAxis === "healthcare") {
        healthcareLabel.classed("active", true).classed("inactive", false);
        smokeLabel.classed("active", false).classed("inactive", true);
        obeseLabel.classed("active", false).classed("inactive", true);
      } else if (chosenYAxis === "smokes") {
        healthcareLabel.classed("active", false).classed("inactive", true);
        smokeLabel.classed("active", true).classed("inactive", false);
        obeseLabel.classed("active", false).classed("inactive", true);
      } else {
        healthcareLabel.classed("active", false).classed("inactive", true);
        smokeLabel.classed("active", false).classed("inactive", true);
        obeseLabel.classed("active", true).classed("inactive", false);
      }
    }
  });
});
