require 'selenium-webdriver'

driver = Selenium::WebDriver.for :firefox

def scroll_to(element)
  script = <<-JS
    arguments[0].scrollIntoView(true);
  JS
  Capybara.current_session.driver.browser.execute_script(script, element.native)
end

def computed_style(selector)
  page.evaluate_script(
    "window.getComputedStyle(document.querySelector('#{selector}'))"
  )
end

Given(/^I am on the index page$/) do
  visit 'https://rushlet.github.io/ci301_data-vis/website/index.html'
end

When(/^I click 'Log in with Spotify'$/) do
  # click_button('Log into Spotify')
  find("#spotify-log-in").click
end

Then(/^I should see the spotify log in page$/) do
  url = current_url
  url.include?("accounts.spotify.com/en/authorize?")
end

Given(/^I am on the Spotify login page$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I sign in with a valid Spotify log in$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should be redirected to the project page$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^there should be an access token appended onto the url$/) do
  pending # Write code here that turns the phrase above into concrete actions
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
