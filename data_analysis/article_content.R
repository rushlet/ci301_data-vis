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

# The top 10 artists with the most number 1s are:
top_10_artists <- head(most_common_artists, 10)
print (top_10_artists)
