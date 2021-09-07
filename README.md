# Intersectional Demographics Evalaution (U.S. Census 2014)

## Background 

The puporse of this visualization is to offer a representation/tool to understand data collected from 2014 ACS 1-year estimates from the US Census Bureau. The data includes information about the population of each state as it pertains to the percentage of poverty, median age, median household income, percentage that lacks healthcare, percentage that are obese, and percentage that smokes cigarettes.

## Functionality

### D3

The code takes advantage of the D3 library in javascript to accomplish the following: 

1. Import demographic data from csv file. 
2. Build bubble chart visualization using SVG wrapper technique. 

### Data Processing 

The script develops the visualization using the following process/built-in methods: 

#### D3 

1. Initialize the chart svg wrapper and define the width and height of the window for the chart. 
2. Define the margins and subsequent height and width of the chart itself.
3. Import the csv file and parse numerical information as numerical values.

#### Methods
The script uses the following built-in methods to deploy the interactive bubble chart to index.html: 

1. xScale(): According to the user's selected axis, update the scale with an appropriate minimum and maximum value for the x-axis. 
2. yScale(): According to the user's selected axis, update the scale with an appropriate minimum and maximum value for the y-axis.
3. renderXAxis(): According to the user's selected x-axis, update the visualized axis with the new information and switch from the previous axis to the current axis with a delay and transition of 1000ms. 
4. renderYAxis(): According to the user's selected y-axis, update the visualized axis with the new information and switch from the previous axis to the current axis with a delay and transition of 1000ms.
5. renderStates(): According to the user's selected axis, re-position the location of each circle on the chart according to its corresponding x and y values. The re-position is programmed to take 1000ms with transition actively showing. 
6. updateCircleText(): According to the user's selected axis, re-position the location of each circle's state abbreivatipon text on the chart according to its corresponding x and y values. The re-position is programmed to take 1000ms with transition actively showing. 
