When(/^I land on the index page$/) do
  visit 'https://rushlet.github.io/ci301_data-vis/website/index.html';
end

Then(/^I should see a prompt to log in with Spotify$/) do
  page.expect have_css('h2', :text => 'Log in with Spotify')
end

Then(/^I should see two buttons \- log in and skip$/) do

end
