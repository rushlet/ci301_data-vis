#sets working directory for your current R session
setwd('~/Sites/uni/ci301_data-vis/data_analysis')
#installs and loads in necessary packages needed for this analysis
install.packages("ggplot2") # for drawing graphs
install.packages("lubridate") # for formatting dates
install.packages("data.table") 
install.packages("plyr")
install.packages("dplyr")
install.packages("reshape2")
install.packages("tm")  # for text mining
install.packages("SnowballC") # for text stemming
install.packages("wordcloud") # word-cloud generator 
install.packages("RColorBrewer") # color palettes
library("plyr")
library("dplyr")
library("reshape2")
library("ggplot2")
library("lubridate")
library("data.table")
library("tm")
library("SnowballC")
library("wordcloud")
library("RColorBrewer")

## groupby

#loads in csv and gives it variable name
all_tracks <- read.csv('fixed_data_for_analysis.csv')

re_entries <- subset(all_tracks, consecutive==FALSE)
non_re_entries <- subset(all_tracks, consecutive==TRUE)
beatles <- subset(all_tracks, artist=="BEATLES")
abba <- subset(all_tracks, artist=="ABBA")
elvis <- subset(all_tracks, artist=="ELVIS PRESLEY")
beatles_elvis  <- subset(all_tracks, artist=="ELVIS PRESLEY" | artist=="BEATLES")
abba_elvis  <- subset(all_tracks, artist=="ELVIS PRESLEY" | artist=="ABBA")
love_titles <- all_tracks[grep("LOVE", all_tracks$title), ]

#prints dataset summary stats to console
summary(all_tracks)
summary(re_entries)
summary(non_re_entries)
summary(beatles)
summary(abba)
summary(elvis)
summary(beatles_elvis)
summary(abba_elvis)
summary(love_titles)

#opens up full dataset in adjacent tab 
View(all_tracks)
View(re_entries)
View(non_re_entries)
View(love_titles)
View(beatles_elvis)

#uses ggplot2 to draw scatterplot + regression line
plot <- ggplot(all_tracks, aes(x = decade, y = danceability)) + geom_point(aes(colour = energy)) + geom_smooth(method='lm',formula=y~x)
plot

plot <- ggplot(all_tracks, aes(x = weeks_at_1, y = danceability + energy)) + geom_point(aes(colour = energy)) + geom_smooth(method='lm',formula=y~x)
plot

plot3 <- ggplot(all_tracks, aes(x = weeks_at_1, y = valence)) + geom_point(aes(colour = energy)) + geom_smooth(method='lm',formula=y~x)
plot3

plot4 <- ggplot(all_tracks, aes(x = decade, y = valence)) + geom_point(aes(colour = energy)) + geom_smooth(method='lm',formula=y~x)
plot4

plot5 <- ggplot(all_tracks, aes(x = consecutive, y = acousticness)) + geom_point(aes()) + geom_smooth(method='lm',formula=y~x)
plot5

plot6 <- ggplot(all_tracks, aes(x = weeks_at_1, y = danceability + energy + acousticness + valence)) + geom_point(aes(colour = key)) + geom_smooth(method='lm',formula=y~x)
plot6

plot7 <- ggplot(all_tracks, aes(x = weeks_at_1, y = energy)) + geom_point(aes(colour = energy)) + geom_smooth(method='lm',formula=y~x)
plot7

plot8 <- ggplot(all_tracks, aes(x = key, y = danceability)) + geom_point(aes(colour = energy)) + geom_smooth(method='lm',formula=y~x)
plot8

plot9 <- ggplot(all_tracks, aes(x = consecutive, y = danceability)) + geom_point(aes(colour = energy)) + geom_smooth(method='lm',formula=y~x)
plot9

plot10 <- ggplot(all_tracks, aes(x = date, y = valence)) + geom_point(aes(colour = energy)) + geom_smooth(method='lm',formula=y~x)
plot10

plot11 <- ggplot(beatles_elvis, aes(x = decade, y = danceability)) + geom_point(aes(colour = artist)) + geom_smooth(method='lm',formula=y~x)
plot11

plot12 <- ggplot(abba_elvis, aes(x = speechiness, y = danceability)) + geom_point(aes(colour = artist)) + geom_smooth(method='lm',formula=y~x)
plot12

plot13 <- ggplot(re_entries, aes(x = decade, y = weeks_at_1)) + geom_point(aes(colour = energy)) + geom_smooth(method='lm',formula=y~x)
plot13

plot14 <- ggplot(re_entries, aes(x = danceability, y = valence)) + geom_point(aes(colour = energy)) + geom_smooth(method='lm',formula=y~x)
plot14

plot15 <- ggplot(all_tracks, aes(x = decade, y = loudness)) + geom_point(aes(colour = energy)) + geom_smooth(method='lm',formula=y~x)
plot15

plot16 <- ggplot(all_tracks, aes(x = energy, y = loudness)) + geom_point(aes(colour = key)) + geom_smooth(method='lm',formula=y~x)
plot16

plot17 <- ggplot(all_tracks, aes(x = decade, y = duration_ms)) + geom_point(aes(colour = key)) + geom_smooth(method='lm',formula=y~x)
plot17

plot18 <- ggplot(all_tracks, aes(x = duration_ms, y = instrumentalness)) + geom_point(aes(colour = key)) + geom_smooth(method='lm',formula=y~x)
plot18

plot18 <- ggplot(all_tracks, aes(x = decade, y = instrumentalness)) + geom_point(aes(colour = key)) + geom_smooth(method='lm',formula=y~x)
plot18

plot19 <- ggplot(all_tracks, aes(x = decade, y = energy)) + geom_point(aes(colour = key)) + geom_smooth(method='lm',formula=y~x)
plot19

plot19 <- ggplot(all_tracks, aes(x = decade, y = tempo)) + geom_point(aes(colour = key)) + geom_smooth(method='lm',formula=y~x)
plot19

plot19 <- ggplot(all_tracks, aes(x = tempo, y = valence)) + geom_point(aes(colour = key)) + geom_smooth(method='lm',formula=y~x)
plot19

#line <- ggplot(data=all_tracks, aes(x = date, y = valence)) + geom_line() + geom_point(color = "red", size = 4)
#line


#linear regression models using variables from top tracks analysis
my.model <- lm(weeks_at_1 ~ danceability + speechiness + energy + acousticness + liveness + valence + instrumentalness, data = all_tracks)
summary(my.model)

my.model <- lm(decade ~ danceability + speechiness + energy + acousticness + liveness + valence + instrumentalness, data = all_tracks)
summary(my.model)

my.model <- lm(decade ~ weeks_at_1, data = all_tracks)
summary(my.model)

my.model <- lm(consecutive ~ danceability + speechiness + energy + acousticness + liveness + valence + instrumentalness , data = all_tracks)
summary(my.model)

my.model <- lm(weeks_at_1 ~ energy + valence + acousticness, data = all_tracks)
summary(my.model)

my.model <- lm(weeks_at_1 ~ danceability + energy + valence + acousticness, data = re_entries)
summary(my.model)

my.model <- lm(acousticness ~ consecutive, data = all_tracks)
summary(my.model)

my.model <- lm(decade ~ danceability, data = beatles_elvis)
summary(my.model)

my.model <- lm(danceability ~ valence, data = all_tracks)
summary(my.model)

my.model <- lm(decade ~ loudness, data = all_tracks)
summary(my.model)

my.model <- lm(decade ~ energy, data = all_tracks)
summary(my.model)

my.model <- lm(energy ~ loudness, data = all_tracks)
summary(my.model)

my.model <- lm(tempo ~ valence, data = all_tracks)
summary(my.model)

plot(all_tracks)

# mode
Mode <- function(x) {
  ux <- unique(x)
  ux[which.max(tabulate(match(x, ux)))]
}
#most common decade
Mode(all_tracks$decade)
#most common time at number 1
Mode(all_tracks$weeks_at_1)

#most common decade for songs containing 'love'
Mode(love_titles$decade)

#find longest consecutive time at number 1
attach(non_re_entries)
longest_consecutive <- non_re_entries[order(-weeks_at_1),] 
View(longest_consecutive)

#find longest time at number 1
attach(all_tracks)
longest <- all_tracks[order(-weeks_at_1),] 
View(longest)

#order tracks by most danceable
attach(all_tracks)
danceable <- all_tracks[order(-danceability),] 
View(danceable)

#order tracks by loudest
attach(all_tracks)
loudest <- all_tracks[order(-loudness),] 
View(loudest)

#order tracks by most energetic
attach(all_tracks)
most_energetic <- all_tracks[order(-energy),] 
View(most_energetic)

#find most energetic
attach(all_tracks)
energetic <- all_tracks[order(-energy),] 
View(energetic)
my_vars <- c('title', 'artist', 'energy', 'decade', 'weeks_at_1')
subset <- energetic[my_vars]
View(subset[order(-weeks_at_1),])
energy <- ggplot(subset, aes(x = weeks_at_1, y = energy)) + geom_point(aes(colour = energy)) + geom_smooth(method='lm',formula=y~x)
energy


#find tracks with highest valence
attach(all_tracks)
valenced <- all_tracks[order(-valence),] 
my_vars <- c('title', 'artist', 'valence', 'decade')
subset <- valenced[my_vars]
View(subset[order(-decade),])

#find most common artists
attach(all_tracks)
most_artisits <- all_tracks[order(artist),] 
View(most_artisits)

#find most common decade for re-entries
attach(re_entries)
most_re_entries <- re_entries[order(-decade),] 
print(most_re_entries)

#find instrumental tracks
attach(all_tracks)
most_instrumental <- all_tracks[order(-instrumentalness),] 
print(most_instrumental)

#find longest tracks
attach(all_tracks)
longest_tracks <- all_tracks[order(-duration_ms),] 
View(longest_tracks)

#find longest combined time for every song of an artist:
combinedTimeByArtist <- aggregate(all_tracks$weeks_at_1, by=list(Category=all_tracks$artist), FUN=sum)
View(combinedTimeByArtist)
#all artists who spent 1 week at number 1:
one_hits <- subset(combinedTimeByArtist, x=="1")
View(one_hits)
#all artists who spent more than 1 week at number 1:
more_than_one <- subset(combinedTimeByArtist, x>"1")
View(more_than_one)


#find average valence per decade
meanValenceByDecade <- aggregate(all_tracks$valence, by=list(Decade=all_tracks$decade), FUN=mean)
View(meanValenceByDecade)

#find average danceability per decade
meanDanceabilityByDecade <- aggregate(all_tracks$danceability, by=list(Decade=all_tracks$decade), FUN=mean)
View(meanDanceabilityByDecade)

#find average loudness per decade
meanLoudnessByDecade <- aggregate(all_tracks$loudness, by=list(Decade=all_tracks$decade), FUN=mean)
View(meanLoudnessByDecade)

#find how many re-entries were in a decade
tapply( re_entries$decade, re_entries$decade, length)

#how many number 1s in each decade?
#find how many songs titles conataining 'love' were in a decade
tapply( all_tracks$decade, all_tracks$decade, length)

#find how many songs titles conataining 'love' were in a decade
tapply( love_titles$decade, love_titles$decade, length)

tapply( love_titles$artist, love_titles$artist, length)

#find how many songs have stayed for portions of time 
res <- tapply( all_tracks$weeks_at_1, all_tracks$weeks_at_1, length)
barplot(res,beside=T,col=c("#ee7700","#3333ff"),
        xlab="Weeks at number 1",ylab="Number of songs")

#find song with max weeks@1
all_tracks[which.max(all_tracks$weeks_at_1),]

#find song with max weeks@1 consecutive
non_re_entries[which.max(non_re_entries$weeks_at_1),]

#find song with min danceability
all_tracks[which.min(all_tracks$danceability),]

#find song with max danceability
all_tracks[which.max(all_tracks$danceability),]

#find song with min valence
all_tracks[which.min(all_tracks$valence),]

#find song with max valence
all_tracks[which.max(all_tracks$valence),]

#find song with max loudness
all_tracks[which.max(all_tracks$loudness),]

#find song with min loudness
all_tracks[which.min(all_tracks$loudness),]

#find song with max acousticness
all_tracks[which.max(all_tracks$acousticness),]

#find song with min acousticness
all_tracks[which.min(all_tracks$acousticness),]

#find song with max liveness
all_tracks[which.max(all_tracks$liveness),]

#find song with min liveness
all_tracks[which.min(all_tracks$liveness),]

#find song with max duration
all_tracks[which.max(all_tracks$duration_ms),]

#find song with min duration
all_tracks[which.min(all_tracks$duration_ms),]

#analyses data to sort by time siganture, ordered by most common time sig
songs_by_time_sig <- group_by(all_tracks, time_signature) %>% summarise(count = n()) %>% arrange(desc(count))
print(songs_by_time_sig)

#analyses data to sort by time siganture, ordered by most common key
songs_by_key <- group_by(all_tracks, key) %>% summarise(count = n()) %>% arrange(desc(count))
print(songs_by_key)
least_common_key <- filter(all_tracks, key==3)
View(least_common_key)
decades_in_least_common_key <- group_by(least_common_key, decade) %>% summarise(count = n()) %>% arrange(desc(count))
print(decades_in_least_common_key)
danceability_in_least_common_key <- group_by(least_common_key, danceability) %>% summarise(count = n()) %>% arrange(desc(count))
print(danceability_in_least_common_key)


# word cloud of words in titles
text <- readLines("titles.txt")
docs <- Corpus(VectorSource(text))
inspect(docs)
toSpace <- content_transformer(function (x , pattern ) gsub(pattern, " ", x))
docs <- tm_map(docs, toSpace, "/")
docs <- tm_map(docs, toSpace, "@")
docs <- tm_map(docs, toSpace, "\\|")
# Convert the text to lower case
docs <- tm_map(docs, content_transformer(tolower))
# Remove numbers
docs <- tm_map(docs, removeNumbers)
# Remove english common stopwords (like 'we' or 'the')
docs <- tm_map(docs, removeWords, stopwords("english"))
# Remove punctuation
docs <- tm_map(docs, removePunctuation)
# Eliminate extra white spaces
docs <- tm_map(docs, stripWhitespace)
# build a 'term document matrix'
dtm <- TermDocumentMatrix(docs)
m <- as.matrix(dtm)
v <- sort(rowSums(m),decreasing=TRUE)
d <- data.frame(word = names(v),freq=v)
head(d, 10)
set.seed(1234)
wordcloud(words = d$word, freq = d$freq, min.freq = 1,
          max.words=200, random.order=FALSE, rot.per=0.35, 
          colors=brewer.pal(8, "Dark2"))

# plot bar chart of frequencies (of 15 highest)
barplot(d[1:15,]$freq, las = 2, names.arg = d[1:15,]$word,
        col ="lightblue", main ="Most frequent words",
        ylab = "Word frequencies")
