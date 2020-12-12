const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  profilePic: {
    type: String,
    default:
      "https://res.cloudinary.com/cloud098/image/upload/v1607753071/no-image_stvwmu.png",
  },
});

const User = mongoose.model("User", userSchema);

function validateUserSignup(user) {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}
function validateUserSignin(user) {
  const schema = Joi.object({
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validateSignup = validateUserSignup;
exports.validateSignin = validateUserSignin;
