const mongoose = require("mongoose");
const Joi = require("joi");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    img: Joi.string().required(),
  });
  return schema.validate(post);
}

exports.Post = Post;
exports.validatePost = validatePost;
