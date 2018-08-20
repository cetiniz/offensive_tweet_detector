const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('../../keys/authkeys');
const TwitterScrapper = require('./twitter_scrapper');

const Label = require('./schemas/label');
const Tweet = require('./schemas/tweet');

const dev_uri = `mongodb://${keys.mongoose.user}:${keys.mongoose.pass}@ds119422.mlab.com:19422/twitter_ml_dev`;

mongoose.connect(dev_uri, {useNewUrlParser: true}, function(err) {
  if (err) throw err;
  console.log('Successfully Connected');
});



const app = express();

// Middlewear
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

// Route to fetch tweets

app.get('/tweet/:username', (req, res) => {
  const user = new TwitterScrapper(req.params.username, 1);
  user.gen_tweets(function(tweet_data) {
    res.send({ express: tweet_data });
  });
});
// Route to post label on tweet

app.post('/tweet/:tweetId', (req, res) => {
  if (req.body && req.body.tweet_id) {
    Tweet.find({
      tweet_id: req.body.tweet_id 
    }).exec(function(err, tweet) {
      if (tweet.length === 0) {
        const newTweet = new Tweet({
          tweet_id: req.body.tweet_id,
          tweet_text: req.body.tweet_text,
          tweet_handle: req.body.tweet_handle
        });
        newTweet.save(function (err) {
          if (err) throw err;
        });
      }
    });
    const newTweetLabel = new Label({
      tweet_id: req.params.tweet_id,
      tweet_label: req.body.tweet_label,
    });
    newTweetLabel.save(function (err) {
      if (err) throw err;
    });
    res.end('sent!')
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
