setwd('~/Sites/uni/ci301_data-vis/data_analysis')
library("dplyr")
library("ggplot2")
library("reshape2")
library("fuzzyjoin") #for partial matches used for artist count check
library("stringr")
library("lubridate")

#loads in csv and gives it variable name
all_tracks <- read.csv('data/fixed_data_for_analysis.csv')
unique_artists <- read.csv('data/unique_artists_track_count.csv')

# how many number 1 songs have there been?
total_tracks <- nrow(all_tracks)
print(total_tracks)

# how many weeks does this cover?
total_weeks <- sum(all_tracks$weeks_at_1)
print(total_weeks)

### Artists

# how many different artists have contributed to a number 1?
total_artists <- nrow(unique_artists)
print(total_artists)

# Number of artists (and who) who contributed to 5 or more tracks
most_common_artists <- subset(unique_artists, track_count >= 5) 
most_common_artists <- group_by(most_common_artists, track_count) %>% arrange(desc(track_count))
number_of_artists_with_5_or_more_tracks <- nrow(most_common_artists)
print(number_of_artists_with_5_or_more_tracks)

# The top 10 artists with the most number 1s are:
top_10_artists <- head(most_common_artists, 10)
print (top_10_artists)

# The artists who have spent most weeks at number 1 (in total)
artists_most_weeks <- arrange(unique_artists, desc(total_weeks))
artists_most_weeks <- head(artists_most_weeks, 10)
print (artists_most_weeks)

# which of the 10 artists with the most tracks are not in the top 10 longest at 1
# Westlife, Spice Girls and Rhianna have released 14, 9 and 9 number 1s but haven't stayed at number 1 so long

# which of the 10 artists longest at 1 are not in 10 most tracks?
# Frankie Laine, Abba and Justin Bieber have been at number 1 for 32, 31 and 29 weeks but have had 4, 9 and 6 tracks

### Tracks

# Which single tracks have lasted longest at number 1?
track_subset <- subset(all_tracks, select = c(1, 2, 16, 18))
tracks_longest_at_one <- group_by(track_subset, weeks_at_1) %>% arrange(desc(weeks_at_1))
ten_tracks_longest_at_one <- head(tracks_longest_at_one, 10)
print(ten_tracks_longest_at_one)
# I BELIEVE-FRANKIE LAINE (18), (EVERYTHING I DO) I DO IT FOR YOU-BRYAN ADAMS (16)

# Which tracks lasted longest consecutively?
track_subset_consecutive <- subset(all_tracks, select = c(1, 2, 16, 18, 19))
track_subset_consecutive <- filter(track_subset_consecutive, consecutive == TRUE)
tracks_longest_at_one_consecutive <- group_by(track_subset_consecutive, weeks_at_1) %>% arrange(desc(weeks_at_1))
ten_tracks_longest_at_one_consecutive <- head(tracks_longest_at_one_consecutive, 10)
print(ten_tracks_longest_at_one_consecutive)
# (EVERYTHING I DO) I DO IT FOR YOU-BRYAN ADAMS(16),LOVE IS ALL AROUND-WET WET WET(15),ONE DANCE-DRAKE WIZKID & KYLA(15)

# Which tracks lasted longest out of reentries?
track_subset_reentry <- subset(all_tracks, select = c(1, 2, 16, 18, 19, 20))
track_subset_reentry <- filter(track_subset_reentry, consecutive == FALSE)
tracks_longest_at_one_reentry <- arrange(track_subset_reentry, desc(weeks_at_1))
ten_tracks_longest_at_one_reentry <- head(tracks_longest_at_one_reentry, 10)
print(ten_tracks_longest_at_one_reentry)
#I BELIEVE-FRANKIE LAINE(18),SHAPE OF YOU-ED SHEERAN(14), BOHEMIAN RHAPSODY-QUEEN(14) 

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
# 56

elvis_reentry <- subset(track_subset_reentry, artist=="ELVIS PRESLEY")
print(elvis_reentry)

### Audio features
audio_features <- subset(all_tracks, select = c(1, 2, 4:18, 21))

# overall avergaes
averages_subset <- subset(all_tracks, select = c(4:15,18, 20))
audio_averages<- sapply(averages_subset, mean, na.rm = T)
options("scipen"=100, "digits"=4) #converts exponentials to decimals
print(audio_averages)

## group by decade, find average audio feature for each decade
decade_averages_subset <- subset(all_tracks, select = c(4:15, 16:20))
decade_averages <- aggregate(decade_averages_subset, by=list(all_tracks$decade), FUN=mean, na.rm=TRUE) #mean for each decade
print(decade_averages)


# graph acousticness, valence, energy and dancebility averages by decade
ggplot(decade_averages, aes(Group.1)) + 
  geom_line(aes(y = acousticness, colour = "acousticness")) + 
  geom_line(aes(y = valence, colour = "valence")) + 
  geom_line(aes(y = energy, colour = "energy")) + 
  geom_line(aes(y = danceability, colour = "danceability"))
# 2000s least acoustic decade, declined massively decade on decade but started to increase in 2010s
# 60s most feel good decade
# energy peaked in 2000s, but hasn't decreased much (looks insignificant but would need to check)
# Danceability increased most in the 80s and has increased by very small amounts since

# most acoustic songs
acoustic_ten <- arrange(all_tracks, desc(acousticness))
acoustic_ten <- subset(acoustic_ten, select = c(1,2,9,16))
acoustic_ten <- head(acoustic_ten, 10)
print (acoustic_ten)

# least acoustic
acoustic_ten_least <- arrange(all_tracks, acousticness)
acoustic_ten_least <- subset(acoustic_ten_least, select = c(1,2,9,16))
acoustic_ten_least <- head(acoustic_ten_least, 10)
print (acoustic_ten_least)

# most danceable songs
danceable_ten <- arrange(all_tracks, desc(danceability))
danceable_ten <- subset(danceable_ten, select = c(1,2,4,16))
danceable_ten <- head(danceable_ten, 10)
print (danceable_ten)

# least danceable
danceable_ten_least <- arrange(all_tracks, danceability)
danceable_ten_least <- subset(danceable_ten_least, select = c(1,2,4,16))
danceable_ten_least <- head(danceable_ten_least, 10)
print (danceable_ten_least)

# most valence songs
valence_ten <- arrange(all_tracks, desc(valence))
valence_ten <- subset(valence_ten, select = c(1,2,12,16))
valence_ten <- head(valence_ten, 10)
print (valence_ten)

# least valence
valence_ten_least <- arrange(all_tracks, valence)
valence_ten_least <- subset(valence_ten_least, select = c(1,2,12,16))
valence_ten_least <- head(valence_ten_least, 10)
print (valence_ten_least)

# most energy songs
energy_ten <- arrange(all_tracks, desc(energy))
energy_ten <- subset(energy_ten, select = c(1,2,5,16))
energy_ten <- head(energy_ten, 10)
print (energy_ten)

# least energy
energy_ten_least <- arrange(all_tracks, energy)
energy_ten_least <- subset(energy_ten_least, select = c(1,2,5,16))
energy_ten_least <- head(energy_ten_least, 10)
print (energy_ten_least)

# shortest songs
duration_ten_least <- arrange(all_tracks, duration_ms)
duration_ten_least <- subset(duration_ten_least, select = c(1,2,14,16))
duration_ten_least <- head(duration_ten_least, 10)
print (duration_ten_least)

# longest songs
duration_ten_most <- arrange(all_tracks, desc(duration_ms))
duration_ten_most <- subset(duration_ten_most, select = c(1,2,14,16))
duration_ten_most <- head(duration_ten_most, 10)
print (duration_ten_most)

# attributes by year
data_for_averages_by_year <-  subset(audio_features, select = c(3:14, 16:18))
averages_by_year <- aggregate(data_for_averages_by_year, by=list(data_for_averages_by_year$year), FUN=mean, na.rm=TRUE) #mean for each year
print(averages_by_year)

ggplot(averages_by_year, aes(Group.1)) + 
  geom_line(aes(y = acousticness, colour = "acousticness")) + 
  geom_line(aes(y = valence, colour = "valence")) + 
  geom_line(aes(y = energy, colour = "energy")) + 
  geom_line(aes(y = danceability, colour = "danceability"))

valence_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = valence)) + geom_line(aes(colour = "valence"), group = 1) + scale_x_continuous(breaks=seq(1950, 2200, 5))
valence_by_year
valence_year_most <- arrange(averages_by_year, desc(valence))
valence_year_most <- head(valence_year_most, 10)
print (valence_year_most)
valence_year_least <- arrange(averages_by_year, valence)
valence_year_least <- head(valence_year_least, 10)
print (valence_year_least)

#1996 valence was lowest since '54, what songs caused this?
# last year of conservative power, dunblane massacre, take that split, charles di divorce, ira active
songs_1996 <- subset(all_tracks, year==1996)
valence_1996_least <- arrange(songs_1996, valence)
valence_1996_least <- head(valence_1996_least, 10)
valence_1996_least <-  subset(valence_1996_least, select = c(1:2, 12))
print (valence_1996_least)
# and most
valence_1996_most <- arrange(songs_1996, desc(valence))
valence_1996_most <- head(valence_1996_most, 10)
valence_1996_most <-  subset(valence_1996_most, select = c(1:2, 12))
print (valence_1996_most)

# valence peaked in 1963
songs_1963 <- subset(all_tracks, year==1963)
valence_1963 <- arrange(songs_1963, desc(valence))
valence_1963 <- head(valence_1963, 10)
valence_1963 <-  subset(valence_1963, select = c(1:2, 12))
print (valence_1963)

valence_summary <- lm(year ~ valence, data = all_tracks)
summary(valence_summary)

danceability_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = danceability)) + geom_line(aes(colour="danceability"), group = 1) + scale_x_continuous(breaks=seq(1950, 2200, 5))
danceability_by_year
danceability_year_most <- arrange(averages_by_year, desc(danceability))
danceability_year_most <- head(danceability_year_most, 10)
print (danceability_year_most)
danceability_year_least <- arrange(averages_by_year, danceability)
danceability_year_least <- head(danceability_year_least, 10)
print (danceability_year_least)
songs_1983 <- subset(all_tracks, year==1983)
danceability_1983 <- arrange(songs_1983, desc(danceability))
danceability_1983 <- head(danceability_1983, 10)
danceability_1983 <-  subset(danceability_1983, select = c(1:2, 4))
print (danceability_1983)
songs_1969 <- subset(all_tracks, year==1969)
danceability_1969 <- arrange(songs_1969, danceability)
danceability_1969 <- head(danceability_1969, 10)
danceability_1969 <-  subset(danceability_1969, select = c(1:2, 4))
print (danceability_1969)

acousticness_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = acousticness)) + geom_line(aes(colour="acousticness"), group = 1) + scale_x_discrete(breaks=seq(1950, 2200, 5))
acousticness_by_year
acousticness_year_most <- arrange(averages_by_year, desc(acousticness))
acousticness_year_most <- head(acousticness_year_most, 10)
print (acousticness_year_most)
acousticness_year_least <- arrange(averages_by_year, acousticness)
acousticness_year_least <- head(acousticness_year_least, 10)
print (acousticness_year_least)


#2015 acousticness spiked, what songs caused this?
all_tracks$date <- dmy(all_tracks$date) #format date as a date type using lubridate library
all_tracks$year <- year(all_tracks$date)
songs_2015 <- subset(all_tracks, year==2015)
songs_2015_acoustic <- arrange(songs_2015, desc(acousticness))
songs_2015_acoustic <- head(songs_2015_acoustic, 10)
songs_2015_acoustic <-  subset(songs_2015_acoustic, select = c(1:2, 9))
print(songs_2015_acoustic)
songs_2009 <- subset(all_tracks, year==2009)
songs_2009_acoustic <- arrange(songs_2009, acousticness)
songs_2009_acoustic <- head(songs_2009_acoustic, 10)
songs_2009_acoustic <-  subset(songs_2009_acoustic, select = c(1:2, 9))
print(songs_2009_acoustic)

energy_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = energy)) + geom_line(aes(colour="energy"), group = 1) + scale_x_discrete(breaks=seq(1950, 2200, 5))
energy_by_year
energy_year_most <- arrange(averages_by_year, desc(energy))
energy_year_most <- head(energy_year_most, 10)
print (energy_year_most)

loudness_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = loudness)) + geom_line(aes(colour="loudness"), group = 1) + scale_x_discrete(breaks=seq(1950, 2200, 5))
loudness_by_year
loudness_year_most <- arrange(averages_by_year, desc(loudness))
loudness_year_most <- head(loudness_year_most, 10)
print (loudness_year_most)

speechiness_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = speechiness)) + geom_line(aes(colour="speechiness"), group = 1) + scale_x_discrete(breaks=seq(1950, 2200, 5))
speechiness_by_year
speechiness_year_most <- arrange(averages_by_year, desc(speechiness))
speechiness_year_most <- head(speechiness_year_most, 10)
print (speechiness_year_most)

instrumentalness_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = instrumentalness)) + geom_line(aes(colour="instrumentalness"), group = 1) + scale_x_discrete(breaks=seq(1950, 2200, 5))
instrumentalness_by_year
instrumentalness_year_most <- arrange(averages_by_year, desc(instrumentalness))
instrumentalness_year_most <- head(instrumentalness_year_most, 10)
print (instrumentalness_year_most)

tempo_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = tempo)) + geom_line(aes(colour="tempo"), group = 1) + scale_x_discrete(breaks=seq(1950, 2200, 5))
tempo_by_year
tempo_year_most <- arrange(averages_by_year, desc(tempo))
tempo_year_most <- head(tempo_year_most, 10)
print (tempo_year_most)


# graph duration by decade
ggplot(decade_averages, aes(Group.1)) + 
  geom_line(aes(y = duration_ms, colour = "duration"))

# duration by year
duration_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = duration_ms)) + geom_line(aes(colour="duration"), group = 1) +scale_x_continuous(breaks=seq(1950, 2200, 5))
duration_by_year
duration_year_most <- arrange(averages_by_year, desc(duration_ms))
duration_year_most <- head(duration_year_most, 10)
print (duration_year_most)

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
loudest_ten <- subset(loudest_ten, select = c(1,2,7,16))
loudest_ten <- head(loudest_ten, 10)
print (loudest_ten)

#attributes by artist
data_for_averages_by_artist <-  subset(audio_features, select = c(1:14, 16:18))
averages_by_artist <- aggregate(data_for_averages_by_artist, by=list(data_for_averages_by_artist$artist), FUN=mean, na.rm=TRUE) #mean for each year
print(averages_by_artist)
