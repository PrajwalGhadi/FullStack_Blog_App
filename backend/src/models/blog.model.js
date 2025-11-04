const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    authorName: {
      type: String,
    },

    category: {
      type: String,
      required: true,
      enum: ["technology", "design", "lifestyle", "productivity"], // ✅ Correct
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    bookmarks: {
      type: Number,
      default: 0,
      min: 0,
    },

    readTime: {
      type: String,
      default: 1,
      min: 1,
    },

    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  try {
    if (this.isModified("content")) {
      // Average reading time
      const WPM = 200; // words per minute

      const wordCount = this.content.trim().split(/\s+/).length;

      // read timestamps
      const readTimeMinutes = Math.ceil(wordCount / WPM);

      this.readTime = Math.max(1, readTimeMinutes);

      next();
    }
  } catch (error) {
    console.log("Error from prevSave blogModel", error.message);
  }
});

const blog = mongoose.model("blog", blogSchema);

module.exports = blog;
