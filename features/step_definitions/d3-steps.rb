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
  scroll_to(page.find(".section-artists", visible: true))
  page.save_screenshot 'features/reports/screenshots/screenshot-test-scroll.png'
  page.execute_script "window.close();"
end

Then(/^I should see a swarm chart$/) do
  scroll_to(page.find("#swarm-chart", visible: true))
  page.save_screenshot 'features/reports/screenshots/swarm-chart.png'
  page.execute_script "window.close();"
end

Given(/^I am on the swarm chart$/) do
  within_webpage do
    scroll_to(page.find("#swarm-chart", visible: true))
  end
  page.execute_script "window.close();"
end

When(/^I scroll to the 'longest' section$/) do
  scrolltext = first('.scroll__text')
  within(scrolltext) do
    scroll_to(page.find('div[data-step="swarm--longest"]', visible: true))
    page.save_screenshot 'features/reports/screenshots/swarm-chart--longest-scroll.png'
  end
  page.execute_script "window.close();"
end

Then(/^I should see the chart zoom in and pan to the right$/) do

  # transform should be applied to svg, translate
  # transform="translate(-1950, 150) scale(5.5,5.5)"
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^add annotations should be added to 'The Beatles' and 'Elvis'$/) do
  pending # Write code here that turns the phrase above into concrete actions
end
