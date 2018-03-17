Feature: Interacting with the graphs

@javascript
Scenario: The one with the swarm chart
Given I am on the project page
When I scroll down to the artist section
Then I should see a swarm chart

@javascript
Scenario: The one with scroll interactions
Given I am on the swarm chart
When I scroll to the 'longest' section
Then I should see annotations added to 'The Beatles' and 'Elvis'
And I should see the chart zoom in and pan to the right

# @javascript
# Scenario: Zoom in explore selection
# Given I am on the 'explore' section of the swarm chart
# When I scroll over the graph
# Then I should see the graph zoom in
#
# @javascript
# Scenario: Pan in explore selection
# Given I am on the 'explore' section of the swarm chart
# When I click and drag the graph
# Then I should see the graph pan
