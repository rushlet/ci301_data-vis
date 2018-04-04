Feature: Personalisation Section

@javascript
Scenario: The one with the personalisation (not logged in)
Given I am not logged in
And I am in the Personalisation section
When I click the first dropdown
Then I should see the list of number 1s

 # @spotify-auth - needed when running personalisation feature in isolation
@javascript
Scenario: The one with the logged in personalisation
# Given I am logged in
# And I am in the Personalisation section
Given I am logged in, on the personalisation section
When I click the first dropdown
Then I should see my top 20 Spotify tracks

@javascript @personalisation-section
Scenario: The one with the dropdown selection
Given I am in the Personalisation section
When I select a song from the dropdown menu
Then it should be displayed in the dropdown box

@javascript @personalisation-section
Scenario: The one with the dropdown search
Given I am in the Personalisation section
When I search for a song
Then it should be displayed in the dropdown box

@javascript @personalisation-section
Scenario: The one with the complete form and the compare button
Given I am in the Personalisation section
And I fill out each dropdown
When I press the 'compare' button
Then I should see a bar chart

@javascript @personalisation-section
Scenario: The one with the incomplete form
Given I am in the Personalisation section
And I do not fill out each dropdown
When I press the 'compare' button
Then I should not see a bar chart
