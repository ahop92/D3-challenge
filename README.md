# Intersectional Demographics Evalaution (U.S. Census 2014)

## Background 

Using data from the 2014 American Community Survey (ACS) Year 1 estimates from the U.S. Census Bureau, our team prepared the above visualization in an effort to reveal any correlations between various types of disparities or demographics within a given state.

![image](https://raw.github.com/ahop92/census-intersectional_demographic-eval-2014/main/images/overview.PNG)

## Instructions 

The data visualization above allows the user to compare two sets of data to one another. The y-axis on the left-hand-side of the graph contains the following options: percentage of citizens in the state lacking healthcare, percentage of population defined as obese, and percentage of the population that smokes. The x-axis on the bottom portion of the graph contains the following groups: percentage of population experiencing poverty, median age of the population, median income of the population. Each demographic/disparity is user-clickable.

![image](https://raw.github.com/ahop92/census-intersectional_demographic-eval-2014/main/images/xaxis.PNG)

![image](images/yaxis.PNG)


## Functionality

### D3

The code takes advantage of the D3 library in javascript to accomplish the following: 

1. Import demographic data from csv file. 
2. Build bubble chart visualization using SVG wrapper technique. 

![image](https://raw.github.com/ahop92/census-intersectional_demographic-eval-2014/main/images/circles.PNG)

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

![image](https://raw.github.com/ahop92/census-intersectional_demographic-eval-2014/main/images/yaxiscode.PNG)

4. renderYAxis(): According to the user's selected y-axis, update the visualized axis with the new information and switch from the previous axis to the current axis with a delay and transition of 1000ms.

![image](https://raw.github.com/ahop92/census-intersectional_demographic-eval-2014/main/images/xaxiscode.PNG)

5. renderStates(): According to the user's selected axis, re-position the location of each circle on the chart according to its corresponding x and y values. The re-position is programmed to take 1000ms with transition actively showing. 
6. updateCircleText(): According to the user's selected axis, re-position the location of each circle's state abbreivatipon text on the chart according to its corresponding x and y values. The re-position is programmed to take 1000ms with transition actively showing. 

#### Results

Observations: Our team noticed that when comparing the healthcare percentage against household income and poverty, the graphs appear to almost be mirror images of one another. This is unsurprising, since since a higher rate of poverty could easily be associated with lower median household income.

States in the south, west, and southwest consistently rank highest among all of the disparity metrics provided with the most consistent offenders for poverty rate, smoking and obesity being WV, AR, AL, KY, LA, MS, and NM. Surprisingly, however, some of these states (WV, DC, and KY) show some of the lowest rates of percentage of population that lacks healthcare among all survey data.

Please note that the axes adjust themselves depending on the metric selected. With that in mind, it's critical to state that the overall rates of obesity for all surveyed states is generally higher than that for smoking. While the scale for the states lacking healthcare is lower than its counterparts in the y-axis group, only 12 states out of 50 have a rate of lacking healthcare lower than 10%. 10% of the smallest state population in the U.S. still amounts to about 57,685 people. By that standard, there is truly a tremendous number of people uninsured medically in the U.S. given how much larger certain state populations can be.
Finally, with respect to observed trends, there is a suggested linear relationship in the United States between the percentage of the population that lacks healthcare and the rate of poverty in a given state. In fact, this relationsship type stands for obestiy and smoking as well. Interestingly, when median age was evaluated in comparison to the avaialble disparity metrics, the percentage lacking healthcare, percentage of the population defined as obese, and the percentage of those who smoke was uniformly concentrated in the age range of roughly 32-44 with the exception of Utah which acted as an outlier around the age of 30 across all three metrics on the y-axis.
