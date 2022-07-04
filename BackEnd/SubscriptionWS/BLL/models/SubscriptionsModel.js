const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  MemberId: { type: Schema.Types.ObjectId, ref: "member", required: true },
  Movies: [
    {
      MovieId: { type: Schema.Types.ObjectId, ref: "movie", required: true },
      Date: { type: Date, required: true },
    },
  ],
});

module.exports = mongoose.model("subscription", subscriptionSchema);
