Feature: Interacting with the graphs

@javascript
Scenario: The one with the swarm chart
Given I am on the project page
When I scroll down to the artist section
Then I should see a swarm chart

@javascript
Scenario Outline: The one with scroll interactions
Given I am on the <type> chart
When I scroll to the <section> section
Then I should see annotations added to <label>
And I should see the chart zoom in and pan to <transform>

Examples:
  |     type    |       section     |     label    |               transform               |
  |    swarm    |       longest     |    Beatles   |  translate(-1950, 150) scale(5.5,5.5) |
  |    swarm    |     successful    |    Westlife  |      translate(225, 75) scale(3,3)    |
  |    swarm    |       bieber      |    Madonna   |     translate(700, 300) scale(7,7)    |
  |     line    | acousticness-low  |     2009     |    translate(-950, -1000) scale(7,7)  |
  |     line    | danceability-high |     1983     |     translate(400, 500) scale(6,6)    |
