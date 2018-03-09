def within_webpage
  visit 'https://rushlet.github.io/ci301_data-vis/website/project.html' do
    yield
  end
end
