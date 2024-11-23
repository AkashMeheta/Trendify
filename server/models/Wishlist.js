const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    privacy: {
      type: Boolean
    }
  },
  {
    timestamps: true,
  })

module.exports = mongoose.model("Whislist", WishlistSchema)