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

When(/^I sign in with an invalid Spotify log in$/) do
  fill_in 'login-username', with: loginDetails['username']
  fill_in 'login-password', with: loginDetails['invalidpassword']
  find("#g-recaptcha-button").click
  page.save_screenshot 'features/reports/screenshots/spotify-login-invalid.png'
end

Then(/^I should see an error on the screen$/) do
  expect(page).to have_css('span', :text => 'Incorrect username or password')
end

When(/^I sign in with a valid Spotify log in$/) do
  fill_in 'login-username', with: loginDetails['username']
  fill_in 'login-password', with: loginDetails['password']
  sleep(2)
  page.save_screenshot 'features/reports/screenshots/spotify-login-valid.png'
  find("#g-recaptcha-button").click
end

Then(/^I should be redirected to the project page$/) do
  current_url.include?("rushlet.github.io/ci301_data-vis/website/project.html")
end

Then(/^there should be an access token appended onto the url$/) do
  current_url.include?("rushlet.github.io/ci301_data-vis/website/project.html#access_token=")
end

When(/^I click 'I don`'t have Spotify'$/) do
  find("#skip-log-in").click
end

Given(/^I am logged in$/) do
  current_url.include?("rushlet.github.io/ci301_data-vis/website/project.html#access_token=")
end

When(/^I scroll to the 'intro slide'$/) do
  scroll_to(page.find(".intro-slide:nth-child(2)", visible: true))
end

Then(/^I should see a 'Follow the Playlist on Spotify' button$/) do
  within(".intro-slide:nth-child(2)") do
    find("button", :text => "Follow the Playlist on Spotify")
    page.save_screenshot 'features/reports/screenshots/spotify-playlist-button.png'
  end
end

Given(/^I am not logged in$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should not see a 'Follow the Playlist on Spotify' button$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

driver.quit(); # closes window after tests run
