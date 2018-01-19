setwd('~/Sites/uni/ci301_data-vis/data_analysis')
install.packages("dplyr")
install.packages("ggplot2") # for drawing graphs
install.packages("reshape2") # for drawing graphs
install.packages("fuzzyjoin")
install.packages("stringr")
install.packages("lubridate") # for working with dates
library("dplyr")
library("ggplot2")
library("reshape2")
library("fuzzyjoin") #for partial matches used for artist count check
library("stringr")
library("lubridate")

#loads in csv and gives it variable name
all_tracks <- read.csv('data/fixed_data_for_analysis.csv')
unique_artists <- read.csv('data/unique_artists_track_count.csv')
View(all_tracks)
View(unique_artists)
#format dates
#print(all_tracks$date)
#dates <- as.Date(all_tracks$date, "%d/%m/%y")
#print(dates) # not getting the right output.... 
#format_dates <- as.Date(ifelse(dates > Sys.Date(), format(dates, "%d/%m/19%y"), format(dates)))
#print(format_dates)
#View(all_tracks)

# how many number 1 songs have there been?
total_tracks <- nrow(all_tracks)
print(total_tracks)
#1325

# how many weeks does this cover?
total_weeks <- sum(all_tracks$weeks_at_1)
print(total_weeks)
#3398

### Artists

# how many different artists have contributed to a number 1?
total_artists <- nrow(unique_artists)
print(total_artists)
#940

# Number of artists (and who) with 5 or more tracks
most_common_artists <- subset(unique_artists, track_count >= 5) 
View(most_common_artists)
most_common_artists <- group_by(most_common_artists, track_count) %>% arrange(desc(track_count))
View(most_common_artists)
number_of_artists_with_5_or_more_tracks <- nrow(most_common_artists)
print(number_of_artists_with_5_or_more_tracks)
#50

# These artists have how many tracks between them?
number_of_tracks_from_most_common_artists <- sum(most_common_artists$track_count)
print(number_of_tracks_from_most_common_artists)
#this includes the same track multiple time though because some were collaborations - ie cliff richard and shadows
#370

# Lasting how long at number 1?
total_weeks_from_most_common_artists <- sum(most_common_artists$total_weeks)
print(total_weeks_from_most_common_artists)
#893

# The top 10 artists with the most number 1s are:
top_10_artists <- head(most_common_artists, 10)
print (top_10_artists)

# The artists who have spent more than 10 weeks at number 1 (in total)
artists_ten_plus_weeks <- group_by(unique_artists, total_weeks) %>% arrange(desc(total_weeks))
artists_ten_plus_weeks <- head(artists_ten_plus_weeks, 10)
print (artists_ten_plus_weeks)

# Frankie Laine has 4 track reach number 1, but has held the top spot for 32 weeks. Are any of these re-entries? (shouldn't be)
frankie_laine_tracks <- subset(all_tracks, artist == "FRANKIE LAINE")
View(frankie_laine_tracks)
# 4 different tracks, 1 of which was a re-entry but is not listed as a separate track.

# which of the 10 artists with the most tracks are not in the top 10 longest at 1
diff_top_10_number <- setdiff(top_10_artists,artists_ten_plus_weeks)
print(diff_top_10_number)
# Westlife, Spice Girls and Rhianna have released 14, 9 and 9 number 1s but haven't stayed at number 1 so long

# which of the 10 artists longest at 1 are not in 10 most tracks?
diff_top_10_longest <- setdiff(artists_ten_plus_weeks,top_10_artists)
print(diff_top_10_longest)
# Frankie Laine, Abba and Justin Bieber have been at number 1 for 32, 31 and 29 weeks but have had 4, 9 and 6 tracks

### Tracks

# Which single tracks have lasted longest at number 1?
track_subset <- subset(all_tracks, select = c(2, 3, 17, 19))
View(track_subset)
tracks_longest_at_one <- group_by(track_subset, weeks_at_1) %>% arrange(desc(weeks_at_1))
ten_tracks_longest_at_one <- head(tracks_longest_at_one, 10)
print(ten_tracks_longest_at_one)
# I BELIEVE-FRANKIE LAINE (18), (EVERYTHING I DO) I DO IT FOR YOU-BRYAN ADAMS (16)

# Which tracks lasted longest consecutively?
track_subset_consecutive <- subset(all_tracks, select = c(2, 3, 17, 19, 20))
track_subset_consecutive <- filter(track_subset_consecutive, consecutive == TRUE)
tracks_longest_at_one_consecutive <- group_by(track_subset_consecutive, weeks_at_1) %>% arrange(desc(weeks_at_1))
ten_tracks_longest_at_one_consecutive <- head(tracks_longest_at_one_consecutive, 10)
print(ten_tracks_longest_at_one_consecutive)
# (EVERYTHING I DO) I DO IT FOR YOU-BRYAN ADAMS(16),LOVE IS ALL AROUND-WET WET WET(15),ONE DANCE-DRAKE WIZKID & KYLA(15)

# Which tracks lasted longest out of reentries?
track_subset_reentry <- subset(all_tracks, select = c(2, 3, 17, 19, 20, 21))
track_subset_reentry <- filter(track_subset_reentry, consecutive == FALSE)
tracks_longest_at_one_reentry <- arrange(track_subset_reentry, desc(weeks_at_1))
ten_tracks_longest_at_one_reentry <- head(tracks_longest_at_one_reentry, 10)
print(ten_tracks_longest_at_one_reentry)
#I BELIEVE-FRANKIE LAINE(18),SHAPE OF YOU-ED SHEERAN(14), DESPACITO-LUIS FONSI & DADDY YANKEE JUSTIN BIEBER(12) 

# Which tracks reentered the charts most?
most_reentered_tracks <- subset(track_subset_reentry, select = c(1, 2, 3, 4, 6))
most_reentered_tracks <- arrange(most_reentered_tracks, desc(times_at_one))
ten_most_reentered_tracks <- head(most_reentered_tracks, 10)
print(ten_most_reentered_tracks)
# reached number 1 3 times:
# I BELIEVE-FRANKIE LAINE,DESPACITO-LUIS FONSI & DADDY YANKEE JUSTIN BIEBER,HAPPY-PHARRELL WILLIAMS,SINGING THE BLUES-GUY MITCHELL

# How many songs re-entered number 1?
number_of_reentries <- nrow(track_subset_reentry)
print(number_of_reentries)
# 55


### Audio features
audio_features <- subset(all_tracks, select = c(2, 3, 5:19))

## group by decade, find average audio feature for each decade
decade_averages_subset <- subset(all_tracks, select = c(5:16, 17:21))
View(decade_averages_subset)
decade_averages <- aggregate(decade_averages_subset, by=list(all_tracks$decade), FUN=mean, na.rm=TRUE) #mean for each decade
print(decade_averages)


# graph acousticness, valence, energy and dancebility averages by decade
ggplot(decade_averages, aes(Group.1)) + 
  geom_line(aes(y = acousticness, colour = "acousticness")) + 
  geom_line(aes(y = valence, colour = "valence")) + 
  geom_line(aes(y = energy, colour = "energy")) + 
  geom_line(aes(y = danceability, colour = "danceability"))
# 2000s least acoustic decade
# 60s most feel good decade
# energy peaked in 2000s, but hasn't decreased much (looks insignificant but would need to check)
# Danceability increased most in the 80s and has increased by very small amounts since

# most acoustic songs
acoustic_ten <- arrange(all_tracks, desc(acousticness))
acoustic_ten <- subset(acoustic_ten, select = c(2,3,10,17))
acoustic_ten <- head(acoustic_ten, 10)
print (acoustic_ten)

ggplot(acoustic_ten, aes(date)) + 
  geom_point(aes(y = acousticness, colour = "acousticness"))

# least acoustic
acoustic_ten_least <- arrange(all_tracks, acousticness)
acoustic_ten_least <- subset(acoustic_ten_least, select = c(2,3,10,17))
acoustic_ten_least <- head(acoustic_ten_least, 10)
print (acoustic_ten_least)

# most danceable songs
danceable_ten <- arrange(all_tracks, desc(danceability))
danceable_ten <- subset(danceable_ten, select = c(2,3,5,17))
danceable_ten <- head(danceable_ten, 10)
print (danceable_ten)

ggplot(danceable_ten, aes(date)) + 
  geom_point(aes(y = danceability, colour = "danceability"))

# least danceable
danceable_ten_least <- arrange(all_tracks, danceability)
danceable_ten_least <- subset(danceable_ten_least, select = c(2,3,5,17))
danceable_ten_least <- head(danceable_ten_least, 10)
print (danceable_ten_least)

# most valence songs
valence_ten <- arrange(all_tracks, desc(valence))
valence_ten <- subset(valence_ten, select = c(2,3,13,17))
valence_ten <- head(valence_ten, 10)
print (valence_ten)

ggplot(danceable_ten, aes(date)) + 
  geom_point(aes(y = danceability, colour = "valence"))

# least valence
valence_ten_least <- arrange(all_tracks, valence)
valence_ten_least <- subset(valence_ten_least, select = c(2,3,13,17))
valence_ten_least <- head(valence_ten_least, 10)
print (valence_ten_least)



# attributes by year
View(audio_features)
audio_features$date <- dmy(audio_features$date) #format date as a date type using lubridate library
audio_features$year <- year(audio_features$date)
View(audio_features)
ncol(audio_features)
data_for_averages_by_year <-  subset(audio_features, select = c(3:14, 16:18))
View(data_for_averages_by_year)
averages_by_year <- aggregate(data_for_averages_by_year, by=list(data_for_averages_by_year$year), FUN=mean, na.rm=TRUE) #mean for each year
print(averages_by_year)

valence_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = valence)) + geom_line(aes(), group = 1) + geom_smooth(method='lm',formula=y~x) + scale_x_discrete(breaks=seq(1950, 2200, 5))
valence_year_least <- arrange(averages_by_year, valence)
valence_year_least <- head(valence_year_least, 10)
print (valence_year_least)

danceability_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = danceability)) + geom_line(aes(), group = 1) + geom_smooth(method='lm',formula=y~x) + scale_x_discrete(breaks=seq(1950, 2200, 5))
danceability_by_year
danceability_year_most <- arrange(averages_by_year, desc(danceability))
danceability_year_most <- head(danceability_year_most, 10)
print (danceability_year_most)


# loudness war
loudness_over_time <- ggplot(all_tracks, aes(x = all_tracks$date, y = loudness)) + geom_point() + geom_smooth(method='lm',formula=y~x)
loudness_over_time
## shows a positive trend on songs getting louder over time, starting to drop in recent years?
## dates on x axis are incorrect?

# graph loudness by decade
ggplot(decade_averages, aes(Group.1)) + 
  geom_line(aes(y = loudness, colour = "loudness"))

# simple linear model of loudness by decade
loudness_model <- lm(Group.1 ~ loudness, data = decade_averages)
summary(loudness_model)
## p value of 0.001748 suggests statistically significant

# loudest songs?
loudest_ten <- group_by(all_tracks, loudness) %>% arrange(desc(loudness))
loudest_ten <- subset(loudest_ten, select = c(2,3,8,17))
loudest_ten <- head(loudest_ten, 10)
print (loudest_ten)




# attributes by artist - how diverse are an artists number 1 songs? 
## this is unfinished - very problematic with variation of artist spellings and issues with loops -> needs further investigation, may not be relevant enough
artists_with_8_or_more_number_ones <- subset(unique_artists, track_count >= 8, select = c(1))
print(artists_with_8_or_more_number_ones)
songs_by_artists_with_8_plus <- merge(artists_with_8_or_more_number_ones,all_tracks,by='artist')
View(songs_by_artists_with_8_plus)

# abba
abba_songs <- filter(songs_by_artists_with_8_plus, artist == "ABBA")
abba_valence_spread <- max(abba_songs$valence) - min(abba_songs$valence)
abba_danceability_spread <- max(abba_songs$danceability) - min(abba_songs$danceability)
abba_acousticness_spread <- max(abba_songs$acousticness) - min(abba_songs$acousticness)
abba_energy_spread <- max(abba_songs$energy) - min(abba_songs$energy)
print(abba_valence_spread)
print(abba_danceability_spread)
print(abba_acousticness_spread)
print(abba_energy_spread)

# eminem
eminem_songs <- filter(songs_by_artists_with_8_plus, artist == "EMINEM")
eminem_valence_spread <- max(eminem_songs$valence) - min(eminem_songs$valence)
eminem_danceability_spread <- max(eminem_songs$danceability) - min(eminem_songs$danceability)
eminem_acousticness_spread <- max(eminem_songs$acousticness) - min(eminem_songs$acousticness)
eminem_energy_spread <- max(eminem_songs$energy) - min(eminem_songs$energy)
print(eminem_valence_spread)
print(eminem_danceability_spread)
print(eminem_acousticness_spread)
print(eminem_energy_spread)

# artist_ranges <- list()
# 
# findRanges <- function(dataset, current_artist) {
#   print(current_artist)
#   typeOf(current_artist)
#   artist_songs <- filter(dataset, artist == current_artist)
#   print(artist_songs)
#   valenceRange <- max(artist_songs$valence) - min(artist_songs$valence)
#   danceabilityRange <- max(artist_songs$danceability) - min(artist_songs$danceability)
#   energyRange <- max(artist_songs$energy) - min(artist_songs$energy)
#   acousticnessRange <- max(artist_songs$acousticness) - min(artist_songs$acousticness)
#   dat <- data.frame(current_artist, valenceRange, danceabilityRange, energyRange, acousticnessRange)
#   print(dat)
#   dat$artist <- current_artist
#   artist_ranges[[current_artist]] <- dat
# }
# 
# for(i in 1:nrow(artists_with_8_or_more_number_ones)){
#   #row <- artists_with_8_or_more_number_ones[i,]
#   artist <- get("artist")
#   #print(row)
#   print(artist)
#   findRanges(songs_by_artists_with_8_plus, artist)
# }
# 
# print (artist_ranges)
# 
