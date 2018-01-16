import json
import urllib2
from bs4 import BeautifulSoup

base_link = "http://www.officialcharts.com"

chart_page_request = urllib2.Request('http://www.officialcharts.com/chart-news/all-the-number-1-singles__7931/', headers={'User-Agent' : "Magic Browser"})
chart_page = urllib2.urlopen(chart_page_request)
soup = BeautifulSoup(chart_page, 'html.parser')
table = soup.find('div', attrs={'class': 'article-content'})
tables = table.findAll('table')
charts = []

def getSongDetails(row):
    song = []
    data = row.findAll('td')
    song.append ({'date' : data[0].string, 'title' : data[1].string, 'artist' : data[2].string, 'weeks_at_1' : data[3].string})
    print song
    charts.append(song)

for x in range (1, len(tables)):
    currentTable = tables[x]
    print currentTable
    rows = currentTable.findAll('tr')
    for y in range (1, len(rows)):
        getSongDetails(rows[y])

with open('updated_charts.json', 'w') as outfile:
    json.dump(charts, outfile)
