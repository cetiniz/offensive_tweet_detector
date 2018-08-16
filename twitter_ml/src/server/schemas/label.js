const mongoose = require('mongoose');

const LabelSchema = mongoose.Schema({
  tweet_id: Number,
  tweet_label: String,
});

const Label = mongoose.model('Label', LabelSchema)
module.exports = Label;
