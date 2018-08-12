const express = require('express');
const mongoose = require('mongoose');

const keys = require('./keys/authkeys');
const TwitterScrapper = require('./twitter_scrapper');



const dev_uri = `mongodb://${keys.mongoose.user}:${keys.mongoose.pass}@ds119422.mlab.com:19422/twitter_ml_dev`;

mongoose.connect(dev_uri, {useNewUrlParser: true}, function(err) {
  if (err) throw err;
  console.log('Successfully Connected');
});

const tweetSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: String,
  author: String,
});

const labelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: String,
  author: String,
});

const app = express();

const port = process.env.PORT || 5000;

// Route to fetch tweets

app.get('/tweet/:username', (req, res) => {
  const user = new TwitterScrapper(req.params.username, 1);
  user.gen_tweets(function(tweet_data) {
    res.send({ express: tweet_data });
  });
});
// Route to post label on tweet

app.get('/tweet/:tweetId', (req, res) => {
  res.send({ express: `Your tweet was ${req.params.tweetId}` });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
