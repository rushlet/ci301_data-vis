Feature: Interacting with the graphs

@javascript
Scenario: Landing on the swarm chart
Given I am on the project page
When I scroll down to the artist section
Then I should see a swarm chart

Scenario: First scroll in swarm chart
Given I am on the scroll chart
When I scroll to the 'longest' section
Then I should see the chart zoom in
And pan to the right
And add annotations to 'The Beatles' and 'Elvis'
