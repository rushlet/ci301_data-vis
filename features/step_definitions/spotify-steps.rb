require 'selenium-webdriver'
require "json"
file = File.read("features/support/login-details.json");
loginDetails = JSON.parse(file)

driver = Selenium::WebDriver.for :firefox

Given(/^I am on the index page$/) do
  visit 'https://rushlet.github.io/ci301_data-vis/website/index.html'
end

When(/^I click 'Log in with Spotify'$/) do
  find("#spotify-log-in").click
end

Then(/^I should see the spotify log in page$/) do
  url = current_url
  url.include?("accounts.spotify.com/en/authorize?")
end

Given(/^I am on the Spotify login page$/) do
  url = current_url
  url.include?("accounts.spotify.com/en/login?continue=")
end

When(/^I sign in with a valid Spotify log in$/) do
  fill_in 'login-username', with: loginDetails['username']
  fill_in 'login-password', with: loginDetails['password']
  sleep(2)
  page.save_screenshot 'features/reports/screenshots/spotify-login-fill-in-username.png'
  find("#g-recaptcha-button").click
  # sleep(2)
  # page.save_screenshot 'features/reports/screenshots/spotify-login-valid.png'
end

Then(/^I should be redirected to the project page$/) do
  current_url.include?("rushlet.github.io/ci301_data-vis/website/project.html")
end

Then(/^there should be an access token appended onto the url$/) do
  current_url.include?("rushlet.github.io/ci301_data-vis/website/project.html#access_token=")
end

When(/^I sign in with an invalid Spotify log in$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should see an error on the screen$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I click 'I don`'t have Spotify'$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^I am logged in$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I scroll to the 'intro slide'$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should see a 'Follow the Playlist on Spotify' button$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^I am not logged in$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should not see a 'Follow the Playlist on Spotify' button$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

driver.quit(); # closes window after tests run
