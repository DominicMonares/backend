const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, index: true },
    profPhoto: String,
    location: String,
    url: String,
    caption: String,
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 24*60*60
    },
    comments: [{
      username: String,
      comment: String,
      profPhoto: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }]
  },
);

module.exports = mongoose.model("Post", postSchema);
