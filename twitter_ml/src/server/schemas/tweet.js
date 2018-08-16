const mongoose = require('mongoose');

const TweetSchema = mongoose.Schema({
  tweet_id: Number,
  tweet_text: String,
  tweet_handle: String,
});

const Tweet = mongoose.model('Tweet', TweetSchema)
module.exports = Tweet;
