const mongoose = require('mongoose');

const GameSchema = {
  name: { type: String, required: true },
  thumbnail: { type: String },
  image: { type: String },
  description: { type: String },
  yearPublished: { type: Number },
  minPlayers: { type: Number },
  maxPlayers: { type: Number },
  playTime: { type: Number },
  minAge: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String, default: '' },
  rating: { type: Number, default: 0 },
};

const Games = mongoose.model('Game', new mongoose.Schema(GameSchema));

module.exports = {
  Games,
};
