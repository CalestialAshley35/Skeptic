const mongoose = require('mongoose');

const SpaceSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
});

module.exports = mongoose.model('Space', SpaceSchema);
