require 'rspotify'
require 'json'

file = File.read('missedChartData.json')
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
    # to get genre, use artist endpoint and returns array of genres for that artist, add as json object to 'genre'
    # artistID = trackJSON["tracks"]["items"][0]["artists"][0]["id"]
    # puts artistID
    # artistDetails = RSpotify::Artist.find(artistID)
    # artistJSON = JSON.parse(artistDetails)
    # genres = artistJSON["genres"]
    # songDetails.push(genres)
    #
    # # to get release year, use album endpoint
    # albumID = trackJSON["tracks"]["items"][0]["album"]["id"]
    # albumDetails = RSpotify::Album.find(albumID)
    # albumJSON = JSON.parse(albumDetails)
    # releaseDate = albumJSON["release_date"]
    # releaseDatePrecision = albumJSON["release_date_precision"]
    # if releaseDatePrecision === 'day'
    #     date = Date.parse(releaseDate)
    #     year = date.year
    # end
    # if releaseDatePrecision === 'year'
    #     year = releaseDate
    # end
    # songDetails.push(year)

    allSongs.push(songDetails)
end

File.open("missed_tracks_spotified.json","w") do |f|
  f.write(allSongs.to_json)
end

def to_json
  {:id => @id, :name => @name}.to_json
end
