const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: "member" },
    movies: [
      {
        movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movie" },
        date: Date,
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Subscription = mongoose.model(
  "subscription",
  subscriptionSchema,
  "subscriptions"
);

module.exports = Subscription;
