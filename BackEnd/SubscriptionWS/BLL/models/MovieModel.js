const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  Name: { type: String, required: true },
  Genres: { type: Array, default: [], required: true },
  Image: { type: String, required: true },
  Premiered: { type: Date, required: true },
});

module.exports = mongoose.model("movie", movieSchema);
