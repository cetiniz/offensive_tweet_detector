const express = require('express');
const mongoose = require('mongoose');
const keys = require('./keys/authkeys');

const dev_uri = `mongodb://${keys.mongoose.user}:${keys.mongoose.pass}@ds119422.mlab.com:19422/twitter_ml_dev`;
mongoose.connect(dev_uri, {useNewUrlParser: true}, function(err) {
  if (err) throw err;
  console.log('Successfully Connected');
});

const app = express();
const port = process.env.PORT || 5000;

// Route to fetch tweets

app.get('/tweet', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// Route to post label on tweet

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
