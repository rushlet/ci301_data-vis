Feature: A Visual Analysis of UK Number 1s

Scenario: Default view
	When I first land on the page
	Then I should see only the first section, with the title
	And I should see the scroll instruction

Scenario: First section
	When I scroll down to the first section
	Then I should see the swarm graph
	And as I scroll further, the graph should stay static
	But the text should scroll
