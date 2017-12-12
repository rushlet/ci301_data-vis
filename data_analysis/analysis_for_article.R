setwd('~/Sites/uni/ci301_data-vis/data_analysis')
install.packages("dplyr")
install.packages("ggplot2") # for drawing graphs
install.packages("reshape2") # for drawing graphs
install.packages("fuzzyjoin")
install.packages("stringr")
library("dplyr")
library("ggplot2")
library("reshape2")
library("fuzzyjoin") #for partial matches used for artist count check
library("stringr")

#loads in csv and gives it variable name
all_tracks <- read.csv('fixed_data_for_analysis.csv')
unique_artists <- read.csv('uniqueArtists.csv')
View(all_tracks)
View(unique_artists)

#1 - most common artists
#analyses data to sort by artist, ordered by most common
most_common_artists <- group_by(all_tracks, artist) %>% summarise(count = n()) %>% arrange(desc(count)) %>% filter (count >= 3) 
View(most_common_artists)

most_common_artists___decade <- group_by(all_tracks, artist, decade) %>% summarise(count = n()) %>% arrange(desc(decade), desc(count))
most_common_artists___decade_top <- group_by(most_common_artists___decade, decade) %>% top_n(n=5, wt=count)
View(most_common_artists___decade_top)

most_common_artist_data <- merge(most_common_artists, all_tracks, by=("artist"))
View(most_common_artist_data)

most_common_artist_subset <- unique(subset(most_common_artist_data, select = -c(3:21))) %>% arrange(desc(count)) %>% filter (count >= 5) 
View(most_common_artist_subset)

most_common_artists_by_weeks_at_1 <- group_by(most_common_artist_data, weeks_at_1) %>% summarise(count = n()) %>% arrange(desc(count)) %>% filter (count >= 8) 
print(most_common_artists_by_weeks_at_1)

averages_by_artist <- group_by(most_common_artist_data, artist) %>% summarise(avg_danceability = mean(danceability, na.rm=TRUE), avg_valence = mean(valence, na.rm=TRUE), avg_decade = mean(decade, na.rm=TRUE)) %>% arrange(desc(avg_danceability))

most_common_artists_graph <- ggplot(most_common_artist_subset, aes(x = decade, y = danceability)) + geom_point(aes(colour = artist)) + geom_smooth(method='lm',formula=y~x)
most_common_artists_graph

#artists by time at number 1
all_tracks_without_attributes = subset(all_tracks, select = -c(1:18,20) ) #make subset of data with artist and weeks at 1
artists_time_at_1 <-aggregate(all_tracks_without_attributes, by=list(all_tracks$artist), FUN=sum, na.rm=TRUE) #mean for each decade
print(artists_time_at_1)



#mean attributes by decade
#http://www.listendata.com/2015/06/r-keep-drop-columns-from-data-frame.html 
all_tracks_attributes = subset(all_tracks, select = -c(1,2,3:4,7,17:18) ) #make subset of data with only the columns to be averaged by decade
#https://stackoverflow.com/questions/21982987/mean-per-group-in-a-data-frame 
averages_by_decade <-aggregate(all_tracks_attributes, by=list(all_tracks$decade), FUN=mean, na.rm=TRUE) #mean for each decade
print(averages_by_decade)

sd_by_decade <-aggregate(all_tracks_attributes, by=list(all_tracks$decade), FUN=sd, na.rm=TRUE) #mean for each decade
print(sd_by_decade)

summary_by_decade <-aggregate(all_tracks_attributes, by=list(all_tracks$decade), FUN=summary, na.rm=TRUE) #mean for each decade
print(summary_by_decade)
ggplot(summary_by_decade, aes(decade, duration_ms)) + geom_boxplot()

ggplot(all_tracks, aes(Group.1, duration_ms)) + geom_boxplot()

all_tracks$decade

danceability_by_decade <- ggplot(averages_by_decade, aes(x = Group.1, y = danceability)) + geom_line(aes(group=1))
danceability_by_decade


#attributes by date
#format date - https://stackoverflow.com/questions/4067761/format-a-date-column-in-a-data-frame
#make 1952 not 2052 - https://stackoverflow.com/questions/11769022/date-import-incorrect-century 
dates <- as.Date(all_tracks$date , "%d/%m/%y")
all_tracks$date <- as.Date(ifelse(dates > Sys.Date(), format(dates, "19%y-%m-%d"), format(dates)))

danceability_by_date <- ggplot(all_tracks, aes(x = date, y = danceability)) + geom_line(aes(group=1)) + geom_smooth(method='lm',formula=y~x)
danceability_by_date

#attributes by year
averages_by_year <- aggregate(all_tracks_attributes, by=list(strftime(all_tracks$date, "%Y")), FUN=mean, na.rm=TRUE) #mean for each year
print(averages_by_year)
d = subset(averages_by_year, Group.1 < 1960)
danceability_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = danceability)) + geom_line(aes(), group = 1) + geom_smooth(method='lm',formula=y~x) + scale_x_discrete(breaks=seq(1950, 2200, 5))
danceability_by_year

danceability_by_year_1 <- ggplot(averages_by_year, aes(x = Group.1, y = danceability)) +
                              geom_line(aes(group = 1)) + 
                              scale_x_discrete(breaks=seq(1950, 2020, 5))
danceability_by_year_1

attributes_out_of_1 <- c("Group.1", "danceability", "energy", "speechiness", "acousticness", "liveness", "valence", "instrumentalness")
averages_by_year__subset <- averages_by_year[attributes_out_of_1]

#https://stackoverflow.com/questions/3777174/plotting-two-variables-as-lines-using-ggplot2-on-the-same-graph



#mean attributes by artist?

mdata <- melt(averages_by_year__subset, id=c("Group.1"))
attributes_by_year <- ggplot(averages_by_year__subset, aes(x = Group.1)) +
                          # geom_line(aes(y = danceability, group = 1, colour = "danceability")) + 
                          geom_line(aes(y = valence, group = 1, colour = "valence")) +
                          # geom_line(aes(y = energy, group = 1, colour = "energy")) + 
                          geom_line(aes(y = acousticness, group = 1, colour = "acousticness")) +
                          scale_x_discrete(breaks=seq(1950, 2020, 5)) +
                          labs(title="atrributes over years", y="scale", x="year")
attributes_by_year

# attributes by time at number 1 - probably not enough data at higher weeks to be reliable
averages_by_weeks_at_1 <-aggregate(all_tracks_attributes, by=list(all_tracks$weeks_at_1), FUN=mean, na.rm=TRUE) #mean for number of weeks at 1
averages_by_weeks__subset <- averages_by_weeks_at_1[attributes_out_of_1]

attributes_by_weeks <- ggplot(averages_by_weeks__subset, aes(x = Group.1)) +
  geom_line(aes(y = danceability, group = 1, colour = "danceability")) + 
  geom_line(aes(y = valence, group = 1, colour = "valence")) +
  geom_line(aes(y = energy, group = 1, colour = "energy")) + 
  geom_line(aes(y = acousticness, group = 1, colour = "acousticness")) +
  labs(title="atrributes by weeks at 1", y="scale", x="weeks at 1")
attributes_by_weeks



most_acoustic <- subset(all_tracks, select = c('artist', 'title', 'acousticness', 'decade', 'date') ) %>% arrange(desc(acousticness)) %>% top_n(n=10, wt=acousticness)
View(most_acoustic)

least_acoustic <- subset(all_tracks, select = c('artist', 'title', 'acousticness', 'decade', 'date') ) %>% top_n(n=10, wt=-acousticness) %>% arrange(acousticness)
View(least_acoustic)

least_acoustic__2009 <- subset(all_tracks, select = c('artist', 'title', 'acousticness', 'decade', 'date') )  %>% filter(date >= as.Date("2009-01-01")  & date < as.Date("2010-01-01")) %>% top_n(n=10, wt=-acousticness) %>% arrange(acousticness) 
View(least_acoustic__2009)

most_acoustic__2015 <- subset(all_tracks, select = c('artist', 'title', 'acousticness', 'decade', 'date') )  %>% filter(date >= as.Date("2015-01-01")  & date < as.Date("2016-01-01")) %>% top_n(n=10, wt=acousticness) %>% arrange(desc(acousticness)) 
View(most_acoustic__2015)





#check to see if artists collaborated and find total number of songs for that artist including collab
#https://stackoverflow.com/questions/12409334/r-identifing-text-string-within-column-of-dataframe
all_artists <- all_tracks[3]


checkForCollab <- function(x) {
  #find all instances of an artist (including when an entry is not just their name ie 'eminem akon' will be returned for 'eminem)
  # checkArtist <- subset(all_tracks, grepl(x, all_tracks$artist))
  #if there is 1 result that is just the 1 song they exact match for - this will already come up so can be ignored
  #if (nrow(unique_artists) > 1) {
    # try and create a dataset of some sort with all the tracks for each unique artist name for further analysis (and probs manual check)
    # left_join(all_tracks_again, checkArtist, by = "artist")  #hmmmm
  # }
  #print(x)
  # https://stackoverflow.com/questions/13774773/check-whether-value-exist-in-one-data-frame-or-not
  #artistCheck <- all_tracks[x %in% all_tracks$artist]
  #if (nrow(artistCheck) > 1) {
   #try and create a dataset of some sort with all the tracks for each unique artist name for further analysis (and probs manual check)
  #}
}

fuzzy <- all_artists %>% fuzzy_inner_join(unique_artists, by = c("artist" = "Artist"), match_fun = str_detect)
fuzzy

fuzzyReg <- all_artists %>% regex_inner_join(unique_artists, by = c("artist" = "Artist"))
fuzzyReg


typeof(unique_artists)
typeof(all_tracks)

testCheck <- left_join(unique_artists, all_tracks, by = c("Artist" = "artist"))  #this does exact match rather than contains or close match - close!
testCheck
View(testCheck)


apply(unique_artists, 1, checkForCollab)
View(all_tracks)
