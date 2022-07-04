const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  UserName: { type: String, required: true },
  Password: { type: String },
});

module.exports = mongoose.model("user", userSchema);
