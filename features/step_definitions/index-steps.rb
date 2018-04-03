When(/^I land on the index page$/) do
  visit 'https://rushlet.github.io/ci301_data-vis/website/index.html';
end

Then(/^I should see a prompt to log in with Spotify$/) do
  expect(page).to have_css('h2', :text => 'Log in with Spotify')
end

Then(/^I should see two buttons \- log in and skip$/) do
  expect(page).to have_css('button', :text => 'Log into Spotify')
  expect(page).to have_css('button', :text => 'I don\'t have Spotify')
end
