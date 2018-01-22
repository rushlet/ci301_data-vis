require 'rspotify'
require 'json'

file = File.read('number_1_songs_with_data.json')
key = File.read('spotify_keys.json')
data_hash = JSON.parse(file)
key = JSON.parse(key)

RSpotify.authenticate(key['1']['client'], key['1']['secret'])
RSpotify.raw_response = true

playlist = RSpotify::Playlist.find('rushlet', '6DNZV1L405XpElhIAUHaKZ')

data_hash.each do |song|
  spotify_id = song[2]
  # official way of using rspotify seems problematic so resort to using get / post method instead
  RSpotify.post("users/rushlet/playlist/#{playlist}tracks?uris=spotify%3Atrack%3A#{spotify_id}")

  # playlist.add_tracks!(track)
end
