const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,  // Remove whitespace
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // Convert to lowercase
    },

    password: {
      type: String,
      required: true,
    },

    // Optional field I will take this info later after user registration is done
    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      trim: true,
    },

    profilePicture: {
      type: String,
      default: "", // URL to image
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
