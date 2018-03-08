require 'rspec/expectations'
require 'capybara'
require 'capybara/cucumber'
require 'capybara/poltergeist'
require 'capybara/mechanize'
require 'test/unit/assertions'
require 'fileutils'

World(Test::Unit::Assertions)

Capybara.app_host   = "https://www.local.bbc.co.uk:1031"
Capybara.app        = "this must be defined for mechanize to not throw a wobbly"
Capybara.run_server = false

Capybara.register_driver :mechanize do |app|
  driver = Capybara::Mechanize::Driver.new(app)
  driver.browser.agent.verify_mode = OpenSSL::SSL::VERIFY_NONE
  driver
end

Capybara.default_driver = :mechanize

World(Capybara)
