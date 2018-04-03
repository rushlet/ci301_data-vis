require 'selenium-webdriver'
require 'launchy'

driver = Selenium::WebDriver.for :firefox
$transform_original;
$transform_update;
$current_chart;

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

Given(/^I am on the (.*?) chart$/) do | type |
  step 'I am on the project page'
  scroll_to(page.find("##{type}-chart", visible: true))
  $current_chart = type;
end

When(/^I scroll to the (.*?) section$/) do | section |
  sleep(3)
  scroll_texts = page.all('.scroll__text');
  container = scroll_texts[0]
  step = "#{$current_chart}--#{section}"
  step1 = "swarm--longest"
  if $current_chart == "line"
    step = "#{$current_chart}-chart--#{section}"
    container = scroll_texts[1];
    step1 = "line-chart--danceability-intro";
    if section == "acousticness-low"
      step1 = "line-chart--acousticness-intro";
    end
  end
  within(container) do
    scroll_to(page.find("div[data-step=#{step1}]", visible: true, wait: 10))
    sleep(3)
    scroll_to(page.find("div[data-step=#{step}]", visible: true, wait: 10))
    sleep(5)
    page.save_screenshot "features/reports/screenshots/annotations/#{$current_chart}--#{section}.png"
  end
end

Then(/^I should see annotations added to (.*?)$/) do | label |
    sleep(5)
    page.assert_selector("#label_#{label} tspan", text: label)
end

Then(/^I should see the chart zoom in and pan to (.*?)$/) do | transformation |
  transform = page.find("##{$current_chart}-chart")[:transform]
  puts transform
  expect(transform).to eq "#{transformation}"
end

driver.quit(); # closes window after tests run
