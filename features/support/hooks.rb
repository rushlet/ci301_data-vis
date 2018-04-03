Before('@spotify-auth') do
  puts 'running hook'
  visit 'https://rushlet.github.io/ci301_data-vis/website/index.html'
  sleep(5)
  page.save_screenshot 'features/reports/screenshots/hook-start.png'
  puts current_url
  if current_url.include?("index.html")
    find("#spotify-log-in").click
    url = current_url
    url.include?("accounts.spotify.com/en/authorize?")
    click_link('Log in to Spotify')
    url = current_url
    url.include?("accounts.spotify.com/en/login?continue=")
  end
  page.save_screenshot 'features/reports/screenshots/hook-end.png'
end

Before('@personalisation-section') do
  puts 'running hook'
  visit 'https://rushlet.github.io/ci301_data-vis/website/project.html'
  sleep(2)
end
