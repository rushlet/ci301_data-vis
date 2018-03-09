require 'selenium-webdriver'
require 'launchy'

driver = Selenium::WebDriver.for :firefox
def scroll_to(element)
  script = <<-JS
    arguments[0].scrollIntoView(true);
  JS

  Capybara.current_session.driver.browser.execute_script(script, element.native)
end

Given(/^I am on the project page$/) do
  visit 'https://rushlet.github.io/ci301_data-vis/website/project.html'
end

When(/^I scroll down to the artist section$/) do
  scroll_to(page.find(".section-artists", visible: false))
  page.save_screenshot 'features/reports/screenshots/screenshot-test-scroll.png'
  Launchy.open 'features/reports/screenshots/screenshot-test-scroll.png'
end

Then(/^I should see a swarm chart$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^I am on the scroll chart$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I scroll to the 'longest' section$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should see the chart zoom in$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^pan to the right$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^add annotations to 'The Beatles' and 'Elvis'$/) do
  pending # Write code here that turns the phrase above into concrete actions
end
