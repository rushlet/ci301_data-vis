Feature: Interacting with the graphs

@javascript
Scenario: Landing on the swarm chart
Given I am on the project page
When I scroll down to the artist section
Then I should see a swarm chart

@javascript
Scenario: First scroll in swarm chart
Given I am on the swarm chart
When I scroll to the 'longest' section
Then I should see annotations added to 'The Beatles' and 'Elvis'
And I should see the chart zoom in and pan to the right
