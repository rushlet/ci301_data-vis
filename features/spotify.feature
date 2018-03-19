Feature: Check Spotify Integrations

@javascript
Scenario: The one with the logging in with Spotify
Given I am on the index page
When I click 'Log in with Spotify'
Then I should see the spotify log in page

@javascript @spotify-auth
Scenario: The one with the invalid login
Given I am on the Spotify login page
When I sign in with an invalid Spotify log in
Then I should see an error on the screen

@javascript @spotify-auth
Scenario: The one with the valid login
Given I am on the Spotify login page
When I sign in with a valid Spotify log in
Then I should be redirected to the project page
And there should be an access token appended onto the url

Scenario: The one where the user skips logging in
Given I am on the index page
When I click 'I don\'t have Spotify'
Then I should be redirected to the project page

@javascript @spotify-auth
Scenario: The one with the playlist button when is logged in
Given I am logged in
And on the project page
When I scroll to the 'intro slide'
Then I should see a 'Follow the Playlist on Spotify' button
When I click the 'Follow the Playlist on Spotify' button
Then I should get a success alert

@javascript
Scenario: The one with the playlist button when not logged in
Given I am on the project page
And I am not logged in
When I scroll to the 'intro slide'
Then I should not see a 'Follow the Playlist on Spotify' button
