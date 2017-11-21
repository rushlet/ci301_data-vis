setwd('~/Sites/uni/top_100/')
install.packages("dplyr")
install.packages("ggplot2") # for drawing graphs
install.packages("reshape2") # for drawing graphs
library("dplyr")
library("ggplot2")
library("reshape2")

#loads in csv and gives it variable name
all_tracks <- read.csv('fixed_data_for_analysis.csv')

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


#attributes by date
#format date - https://stackoverflow.com/questions/4067761/format-a-date-column-in-a-data-frame
#make 1952 not 2052 - https://stackoverflow.com/questions/11769022/date-import-incorrect-century 
dates <- as.Date(all_tracks$date , "%d/%m/%Y")
all_tracks$date <- as.Date(ifelse(dates > Sys.Date(), format(dates, "19%y-%m-%d"), format(dates)))

danceability_by_date <- ggplot(all_tracks, aes(x = date, y = danceability)) + geom_line(aes(group=1)) + geom_smooth(method='lm',formula=y~x)
danceability_by_date

#attributes by year
averages_by_year <-aggregate(all_tracks_attributes, by=list(strftime(all_tracks$date, "%Y")), FUN=mean, na.rm=TRUE) #mean for each year
print(averages_by_year)
d = subset(averages_by_year, Group.1 < 1960)
danceability_by_year <- ggplot(averages_by_year, aes(x = Group.1, y = danceability)) + geom_line(aes(), group = 1) + geom_smooth(method='lm',formula=y~x) + scale_x_discrete(breaks=seq(1950, 2200, 5))
danceability_by_year

danceability_by_year_1 <- ggplot(averages_by_year, aes(x = Group.1, y = danceability)) +
                              geom_line(aes(group = 1)) + 
                              scale_x_discrete(breaks=seq(1950, 2200, 5))
danceability_by_year_1

attributes_out_of_1 <- c("Group.1", "danceability", "energy", "speechiness", "acousticness", "liveness", "valence", "instrumentalness")
averages_by_year__subset <- averages_by_year[attributes_out_of_1]

#https://stackoverflow.com/questions/3777174/plotting-two-variables-as-lines-using-ggplot2-on-the-same-graph
mdata <- melt(averages_by_year__subset, id=c("Group.1"))
attributes_by_year <- ggplot(averages_by_year__subset, aes(x = Group.1)) +
                          geom_line(aes(y = danceability, group = 1, colour = "danceability")) + 
                          geom_line(aes(y = valence, group = 1, colour = "valence")) +
                          geom_line(aes(y = energy, group = 1, colour = "energy")) + 
                          geom_line(aes(y = acousticness, group = 1, colour = "acousticness")) +
                          scale_x_discrete(breaks=seq(1950, 2200, 5)) +
                          labs(title="atrributes over years", y="scale", x="year")
attributes_by_year

