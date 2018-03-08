Feature: A Visual Analysis of UK Number 1s

# Scenario: Default view
# 	When I first land on the page
# 	Then I should see only the first section, with the title
# 	And I should see the scroll instruction

# Scenario: First section
# 	When I scroll down to the first section
# 	Then I should see the swarm graph
# 	And as I scroll further, the graph should stay static
# 	But the text should scroll

# Scenario: Test Scroll and D3
# Given I am on the website
# And the 'swarm--intro' div is in view
# When I scroll
# Then the chart should zoom in
# And the labels should be added

Scenario: Google search for voter cards app
    When I search Google for "itunes vote cards app"
    Then I should see "Vote Cards" in the result
