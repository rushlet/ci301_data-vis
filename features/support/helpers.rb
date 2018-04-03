require 'selenium-webdriver'
require "json"

def scroll_to(element)
  script = <<-JS
    arguments[0].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  JS
  Capybara.current_session.driver.browser.execute_script(script, element.native)
end

def computed_style(selector)
  page.evaluate_script(
    "window.getComputedStyle(document.querySelector('#{selector}'))"
  )
end

def log_in
  if current_url.include?("accounts.spotify.com/en/login?continue=")
    sleep(2)
    page.save_screenshot 'features/reports/screenshots/log-in-helper.png'
    file = File.read("features/support/login-details.json");
    loginDetails = JSON.parse(file)
    fill_in 'login-username', with: loginDetails['username']
    fill_in 'login-password', with: loginDetails['password']
    find("#g-recaptcha-button").click
    sleep(2)
    page.save_screenshot 'features/reports/screenshots/log-in-helper-end.png'
  end
end

def select_option (option)
  find('.selectize-input').click
  dropdown = find('.selectize-dropdown-content', visible: false)
  within dropdown do
    options = all('.option', visible: false)
    options[option].click
  end
end

Given(/^I am logged in$/) do
  log_in
  puts current_url
  raise 'error - not logged in' unless current_url.include?("rushlet.github.io/ci301_data-vis/website/project.html#access_token=")
end

Given(/^I am not logged in$/) do
  if current_url.include?('rushlet.github.io/ci301_data-vis/website/project.html')
    raise 'error - logged in' unless !current_url.include?("#access_token=")
  else
    visit 'https://rushlet.github.io/ci301_data-vis/website/project.html'
    sleep(2)
    if current_url.include?('rushlet.github.io/ci301_data-vis/website/project.html')
      raise 'error - logged in' unless !current_url.include?("#access_token=")
    end
  end
end
