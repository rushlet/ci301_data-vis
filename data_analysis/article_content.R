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
all_tracks <- read.csv('data/fixed_data_for_analysis.csv')
unique_artists <- read.csv('data/unique_artists_track_count.csv')
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

### Artists

# how many different artists have contributed to a number 1?
total_artists <- nrow(unique_artists)
print(total_artists)
#941

# Number of artists (and who) with 5 or more tracks
most_common_artists <- subset(unique_artists, track_count >= 5) 
View(most_common_artists)
most_common_artists <- group_by(most_common_artists, track_count) %>% arrange(desc(track_count))
View(most_common_artists)
number_of_artists_with_5_or_more_tracks <- nrow(most_common_artists)
print(number_of_artists_with_5_or_more_tracks)
#52

# These artists have how many tracks between them?
number_of_tracks_from_most_common_artists <- sum(most_common_artists$track_count)
print(number_of_tracks_from_most_common_artists)
#this includes the same track multiple time though because some were collaborations - ie cliff richard and shadows
#387

# Lasting how long at number 1?
total_weeks_from_most_common_artists <- sum(most_common_artists$total_weeks)
print(total_weeks_from_most_common_artists)
#968

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
View(track_subset_consecutive)
track_subset_consecutive <- filter(track_subset_consecutive, consecutive == TRUE)
View(track_subset_consecutive)
tracks_longest_at_one_consecutive <- group_by(track_subset_consecutive, weeks_at_1) %>% arrange(desc(weeks_at_1))
ten_tracks_longest_at_one_consecutive <- head(tracks_longest_at_one_consecutive, 10)
print(ten_tracks_longest_at_one_consecutive)
# (EVERYTHING I DO) I DO IT FOR YOU-BRYAN ADAMS(16),LOVE IS ALL AROUND-WET WET WET(15),ONE DANCE-DRAKE WIZKID & KYLA(15)

# Which tracks lasted longest out of reentries?
track_subset_reentry <- subset(all_tracks, select = c(2, 3, 17, 19, 20, 21))
track_subset_reentry <- filter(track_subset_reentry, consecutive == FALSE)
tracks_longest_at_one_reentry <- group_by(track_subset_reentry, weeks_at_1) %>% arrange(desc(weeks_at_1))
ten_tracks_longest_at_one_reentry <- head(tracks_longest_at_one_reentry, 10)
print(ten_tracks_longest_at_one_reentry)
#I BELIEVE-FRANKIE LAINE(18),SHAPE OF YOU-ED SHEERAN(14), DESPACITO-LUIS FONSI & DADDY YANKEE JUSTIN BIEBER(12) 

# Which tracks reentered the charts most?
most_reentered_tracks <- subset(track_subset_reentry, select = c(1, 2, 3, 4, 6))
most_reentered_tracks <- group_by(most_reentered_tracks, times_at_one) %>% arrange(desc(times_at_one))
ten_most_reentered_tracks <- head(most_reentered_tracks, 10)
print(ten_most_reentered_tracks)
# reached number 1 3 times:
# I BELIEVE-FRANKIE LAINE,DESPACITO-LUIS FONSI & DADDY YANKEE JUSTIN BIEBER,HAPPY-PHARRELL WILLIAMS,SINGING THE BLUES-GUY MITCHELL

