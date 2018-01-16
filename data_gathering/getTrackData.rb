require 'rspotify'
require 'json'

file = File.read('updated_charts.json')
data_hash = JSON.parse(file)

RSpotify.authenticate("30d58fa2956047a7ba12f51bd9ad2438", "029860e93bb241eda4fbdacde2e4a18b")
RSpotify.raw_response = true

allSongs = []

data_hash.each do |title, artist|
    track = RSpotify::Track.search("#{title} #{artist}", limit: 1, market: 'GB')
    puts title
    trackJSON = JSON.parse(track)
    if title == 'LET IT BE' && artist == 'FERRY AID'
        trackID = '7gGYXXCSkzWNEEKzMToCjX'
    elsif title == 'DOCTORIN\' THE TARDIS'
        trackID = '1e388YJ0UlDpKQRZntkRoH'
    elsif title == 'DO THEY KNOW IT\'S CHRISTMAS?' && artist == 'BAND AID II'
        trackID = '2M5Ae3Zokq8RsJPDnUSAKR'
    elsif title == 'COME ON YOU REDS'
        trackID = '73FT7FAMhz5QEso658Etii'
    else
        trackID = trackJSON["tracks"]["items"][0]["id"]
    end

    songDetails = [title, artist, trackID]
    getTrackDetails = RSpotify.get("audio-features?ids=#{trackID}")
    trackDetailsJSON = JSON.parse(getTrackDetails)
    audioFeatures = trackDetailsJSON["audio_features"][0]
    audioFeatures.each do |feature, score|
        songDetails.push(score)
    end
    allSongs.push(songDetails)
end

File.open("updated_spotified_tracks.json","w") do |f|
  f.write(allSongs.to_json)
end

def to_json
  {:id => @id, :name => @name}.to_json
end
