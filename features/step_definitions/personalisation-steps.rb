require 'selenium-webdriver'
driver = Selenium::WebDriver.for :firefox

Given(/^I am in the Personalisation section$/) do
  sleep(3)
  page.save_screenshot 'features/reports/screenshots/personalisation-section.png'
  scroll_to(page.find(".section-personalisation"))
end

Given(/^I am logged in, on the personalisation section$/) do
  step 'I am on the index page'
  puts current_url
  step 'I click \'Log in with Spotify\''
  sleep(4)
  puts current_url
  raise 'error - not logged in' unless current_url.include?("rushlet.github.io/ci301_data-vis/website/project.html#access_token")
  sleep(3)
  scroll_to(page.find(".section-personalisation"))
  page.save_screenshot 'features/reports/screenshots/personalisation-section.png'
end

When(/^I click the first dropdown$/) do
  within(".section-personalisation") do
    trigger = first('.selectize-input').click
    sleep(2)
    page.save_screenshot 'features/reports/screenshots/personalisation-dropdown1.png'
  end
end

Then(/^I should see my top 20 Spotify tracks$/) do
  dropdown = first('.selectize-dropdown', visible: false).find(:css, '.selectize-dropdown-content', visible: false)
  expect(dropdown).to have_selector('.option', visible: false, count: 20)
  page.save_screenshot 'features/reports/screenshots/personalisation-dropdown1--logged-in.png'
end

Then(/^I should see the list of number 1s$/) do
  dropdown = first('.selectize-dropdown', visible: false).find(:css, '.selectize-dropdown-content', visible: false)
  expect(dropdown).to have_selector('.option', visible: false, count: 1321)
  page.save_screenshot 'features/reports/screenshots/personalisation-dropdown1--not-logged-in.png'
end

When(/^I select a song from the dropdown menu$/) do
  within(".section-personalisation") do
    page.save_screenshot 'features/reports/screenshots/personalisation-section.png'
    first('.selectize-input').click
    sleep(2)
    dropdown = first('.selectize-dropdown', visible: false).find(:css, '.selectize-dropdown-content', visible: false)
    within dropdown do
      first('.option', visible: false).click
      sleep(2)
      page.save_screenshot 'features/reports/screenshots/personalisation-dropdown1--selection.png'
    end
  end
end

Then(/^it should be displayed in the dropdown box$/) do
  within(first('.selectize-input')) do
    find('.item').text
  end
end

When(/^I search for a song$/) do
  # assume not logged in
  scroll_to(first('.selectize-input'))
  within(first('.selectize-input')) do
    fill_in 'Choose a song', :with => 'ashes to ashes'
  end
  dropdown = first('.selectize-dropdown', visible: false).find(:css, '.selectize-dropdown-content', visible: false)
  within dropdown do
    first('.option', visible: false).click
    sleep(2)
  end
  page.save_screenshot 'features/reports/screenshots/personalisation-dropdown1--search.png'
end

Given(/^I fill out each dropdown$/) do
  expect(page).to have_css('.selectize-control', visible: false)
  inputs = page.all('.selectize-control', visible: false)
  scroll_to(inputs[0])
  within inputs[0] do
    select_option(5)
  end
  within inputs[1] do
    select_option(8)
  end
  within inputs[2] do
    select_option(1)
  end
  page.save_screenshot 'features/reports/screenshots/personalisation--all-dropdowns.png'
end

When(/^I press the 'compare' button$/) do
  find('#personalisation-input--submit').click
  sleep(2)
end

Then(/^I should see a bar chart$/) do
  bar_chart = find('#bar-chart')
  scroll_to(bar_chart)
  sleep(5)
  bars = bar_chart.all('.bar')
  page.save_screenshot 'features/reports/screenshots/personalisation--bar-chart.png'
  expect(bars.length).to eq(2)
end

Given(/^I do not fill out each dropdown$/) do
  expect(page).to have_css('.selectize-control', visible: false)
  inputs = page.all('.selectize-control', visible: false)
  within inputs[0] do
    select_option(120)
  end
end

Then(/^I should not see a bar chart$/) do
  bar_chart = find('#bar-chart')
  scroll_to(find('#personalisation-input--submit'))
  within bar_chart do
    expect(bar_chart).not_to have_selector(".bar")
  end
  page.save_screenshot 'features/reports/screenshots/personalisation--no-bar-chart.png'
end

driver.quit(); # closes window after tests run
