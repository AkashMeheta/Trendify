const mongoose = require("mongoose");

const FriendsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    friends: [
      {
        friendId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friends", FriendsSchema);
