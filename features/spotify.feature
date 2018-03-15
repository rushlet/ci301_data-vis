Feature: Check Spotify Integrations

@javascript
Scenario: Open Spotify login page
Given I am on the index page
When I click 'Log in with Spotify'
Then I should see the spotify log in page

@javascript @spotify-auth 
Scenario: Valid log in
Given I am on the Spotify login page
When I sign in with a valid Spotify log in
Then I should be redirected to the project page
And there should be an access token appended onto the url

# Scenario: Invalid log in
# Given I am on the Spotify login page
# When I sign in with an invalid Spotify log in
# Then I should see an error on the screen
#
# Scenario: Skip log in
# Given I am on the index page
# When I click 'I don`'t have Spotify'
# Then I should be redirected to the project page
#
# Scenario: Playlist button (logged in)
# Given I am on the project page
# And I am logged in
# When I scroll to the 'intro slide'
# Then I should see a 'Follow the Playlist on Spotify' button
#
# Scenario: Playlist button (not logged in)
# Given I am on the project page
# And I am not logged in
# When I scroll to the 'intro slide'
# Then I should not see a 'Follow the Playlist on Spotify' button
