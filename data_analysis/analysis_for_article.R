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
unique_artists <- read.csv('unique_artists_count.csv')
View(all_tracks)
View(unique_artists)

# how many number 1 songs have there been?
total_tracks <- nrow(all_tracks)
print(total_tracks)
#1325

# how many weeks does this cover?
total_weeks <- sum(all_tracks$weeks_at_1)
print(total_weeks)
#3398

# how many different artists have contributed to a number 1?
total_artists <- nrow(unique_artists)
print(total_artists)
#941

# Number of artists (and who) with 5 or more tracks
most_common_artists <- subset(unique_artists, track_count >= 5) 
number_of_artists_with_5_or_more_tracks <- nrow(most_common_artists)
print(number_of_artists_with_5_or_more_tracks)
#51

# These artists have how many tracks between them?
number_of_tracks_from_most_common_artists <- sum(most_common_artists$track_count)
print(number_of_tracks_from_most_common_artists)
#377

# Lasting how long at number 1?
total_weeks_from_most_common_artists <- sum(most_common_artists$total_weeks)
print(total_weeks_from_most_common_artists)
# 921

# cumulative time at number 1 - what percentage of all time charts do these artists account for?
#this is inaccurate because some collaborated, so same track counts twice :( (e.g. cliff richard and shadows)

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

loudness_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = loudness)) + geom_line(aes(), group = 1) + geom_smooth(method='lm',formula=y~x) + scale_x_discrete(breaks=seq(1950, 2200, 5))
loudness_by_year

valence_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = valence)) + geom_line(aes(), group = 1) + geom_smooth(method='lm',formula=y~x) + scale_x_discrete(breaks=seq(1950, 2200, 5))
valence_by_year

danceability_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = danceability)) + geom_line(aes(), group = 1) + geom_smooth(method='lm',formula=y~x) + scale_x_discrete(breaks=seq(1950, 2200, 5))
danceability_by_year

my.model <- lm(Group.1 ~ danceability, data = averages_by_year)
summary(my.model)

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
                          geom_line(aes(y = energy, group = 1, colour = "energy")) + 
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
unique_artists <- read.csv('unique_artists_count.csv')
View(unique_artists)
ordered_unique_artists <- unique_artists[with(unique_artists, order(-count)), ]
ordered_unique_artists <- ordered_unique_artists[-c(3), ] #drop elvis presley entry in favour of elvis (other data cleaning & checking will be needed) 
View(ordered_unique_artists)
ordered_unique_artists_time_at_one <- ordered_unique_artists[with(ordered_unique_artists, order(-total_weeks)), ]
View(ordered_unique_artists_time_at_one)
