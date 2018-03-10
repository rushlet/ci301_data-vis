require 'selenium-webdriver'
require 'launchy'

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

Given(/^I am on the project page$/) do
  visit 'https://rushlet.github.io/ci301_data-vis/website/project.html'
end

When(/^I scroll down to the artist section$/) do
  scroll_to(page.find(".section-artists", visible: true))
  page.save_screenshot 'features/reports/screenshots/screenshot-test-scroll.png'
end

Then(/^I should see a swarm chart$/) do
  scroll_to(page.find("#swarm-chart", visible: true))
  page.save_screenshot 'features/reports/screenshots/swarm-chart.png'
end

Given(/^I am on the swarm chart$/) do
  step 'I am on the project page'
  scroll_to(page.find("#swarm-chart", visible: true))
end

When(/^I scroll to the 'longest' section$/) do
  scrolltext = first('.scroll__text')
  within(scrolltext) do
    scroll_to(page.find('div[data-step="swarm--longest"]', visible: true, wait: 5))
    page.save_screenshot 'features/reports/screenshots/swarm-chart--longest-scroll.png'
  end
end

Then(/^I should see annotations added to 'The Beatles' and 'Elvis'$/) do
  within("#swarm-chart") do
    sleep(3)
    page.save_screenshot 'features/reports/screenshots/swarm-chart--longest-scroll-annotations.png'
    page.assert_selector('#Beatles_label tspan', text: 'Beatles')
    page.assert_selector('#Elvis_label tspan', text: 'Elvis')
    #visible: :visible, visible: :hidden
  end
end

Then(/^I should see the chart zoom in and pan to the right$/) do
  transform = page.find('#swarm-chart')[:transform]
  expect(transform).to eq "translate(-1950, 150) scale(5.5,5.5)"
end

driver.quit(); # closes window after tests run
