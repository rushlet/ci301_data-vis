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
# And I should see the chart zoom in and pan to <transform>

Examples:
  |     type    |       section     |     label    |               transform               |
  |    swarm    |       longest     |    Beatles   |  translate(-1950, 150) scale(5.5,5.5) |
  |    swarm    |     successful    |    Westlife  |  translate(-1950, 150) scale(5.5,5.5) |
  |    swarm    |       bieber      |    Madonna   |  translate(-1950, 150) scale(5.5,5.5) |
  |     line    | acousticness-low  |     2009     |  translate(-1950, 150) scale(5.5,5.5) |
  |     line    | danceability-high |     1983     |  translate(-1950, 150) scale(5.5,5.5) |

#Scenario: The one with the deleted labels
# Given I am on the <type> chart
# And I am on the <section> section
# When I scroll to the next section
# Then the <artist> labels should be removed from the DOM

# Examples:
#   |     type    |       section     |     label    |
#   |    swarm    |       longest     |    Beatles   |
#   |    swarm    |     successful    |    Westlife  |
#   |    swarm    |       bieber      |    Madonna   |
#   |     line    | acousticness-low  |     2009     |
#   |     line    | danceability-high |     1983     |
