require 'selenium-webdriver'
driver = Selenium::WebDriver.for :firefox

Given(/^I am in the Personalisation section$/) do
  sleep(3)
  page.save_screenshot 'features/reports/screenshots/personalisation-section.png'
  scroll_to(page.find(".section-personalisation"))
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
  expect(dropdown).to have_selector('.option', visible: false, count: 1325)
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
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I press the 'compare' button$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should see a bar chart$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^each of my selections should be labelled$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^I do not fill out each dropdown$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should not see a bar chart$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

driver.quit(); # closes window after tests run
