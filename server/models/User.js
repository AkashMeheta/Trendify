const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "user",
  },
  image: {
    type: String
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
