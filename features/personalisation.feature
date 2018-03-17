Feature: Personalisation Section

Scenario: The one where the user is logged in
Given the user is logged in
And the user is in the Personalisation section
When they click the first dropdown
Then they should see their top 20 Spotify tracks

Scenario: The one where the user is not logged in
Given the user is not logged in
And the user is in the Personalisation section
When they click the first dropdown
Then they should see the list of number 1s

Scenario: The one where the user selects an item from the dropdown
Given the user is in the Personalisation section
When they select a song from the dropdown menu
Then it should be displayed in the dropdown box

Scenario: The one where the user selects an item from the dropdown
Given the user is in the Personalisation section
When they searches for a song
Then it should be displayed in the dropdown box

Scenario: The one where the user fills in the dropdowns and clicks the compare button
Given the user is in the Personalisation selection
And they fill out each dropdown
When they press the 'compare' button
Then they should see a bar chart
And each of their selections should be labelled

Scenario: The one where the user does not fill in the dropdowns and clicks the compare button
Given the user is in the Personalisation selection
And they do not fill out each dropdown
When they press the 'compare' button
Then they should not see a bar chart
