import csv
import sys
from twitter_scraper import get_tweets

if len(sys.argv) >= 3:
    twitter_handle = sys.argv[1]
    twitter_pages = sys.argv[2]
else:
    print("Two command line arguments are expected")
    sys.exit()

tweets = get_tweets(twitter_handle, pages=int(twitter_pages))

filename = "tweet_data_" + twitter_handle + ".csv"
with open(filename, 'w') as csvfile:
    writer = csv.writer(csvfile, delimiter=',', quotechar='~')
    writer.writerow(['handle', 'text'])
    for tweet in tweets:
        writer.writerow([twitter_handle, tweet['text']])
