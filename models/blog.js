const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 300, // Short preview limit
    },
    fullDescription: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogUser',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    collection:'newBlogs'
  }
);

module.exports = mongoose.model('NewBlog', blogSchema);
