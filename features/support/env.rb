require 'rspec/expectations'
require 'capybara'
require 'capybara/cucumber'
require 'capybara/poltergeist'
require 'capybara/mechanize'
require 'test/unit/assertions'
require 'fileutils'

World(Test::Unit::Assertions)

Capybara.app_host   = "https://rushlet.github.io/"
Capybara.app        = "this must be defined for mechanize to not throw a wobbly"
Capybara.run_server = false

Capybara.register_driver :mechanize do |app|
  driver = Capybara::Mechanize::Driver.new(app)
  driver.browser.agent.verify_mode = OpenSSL::SSL::VERIFY_NONE
  driver
end

Capybara.default_driver = :mechanize

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :firefox)
end
Capybara.javascript_driver = :selenium

# module JavascriptDriver
#   # other code that prepares capybara to work with selenium
#
#   def scroll_to(element)
#     script = <<-JS
#       arguments[0].scrollIntoView(true);
#     JS
#
#     Capybara.current_session.driver.browser.execute_script(script, element.native)
#   end
# end

World(Capybara)
