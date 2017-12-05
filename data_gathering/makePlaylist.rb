require 'rspotify'
require 'json'

file = File.read('number_1_songs_with_data.json')
data_hash = JSON.parse(file)

RSpotify.authenticate("30d58fa2956047a7ba12f51bd9ad2438", "029860e93bb241eda4fbdacde2e4a18b")
RSpotify.raw_response = true

playlist = RSpotify::Playlist.find('rushlet', '6DNZV1L405XpElhIAUHaKZ')

data_hash.each do |song|
  spotify_id = song[2]
  # official way of using rspotify seems problematic so resort to using get / post method instead
  RSpotify.post("users/rushlet/playlist/#{playlist}tracks?uris=spotify%3Atrack%3A#{spotify_id}")

  # playlist.add_tracks!(track)
end
