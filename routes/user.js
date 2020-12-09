const express = require("express");
const auth = require("../middleware/auth");
const { Post, validatePost } = require("../models/post");
const { User } = require("../models/user");

const router = express.Router();

router.get("/user/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) res.status(404).send("User Not Found");
  const posts = await Post.find({ postedBy: req.params.id }).populate(
    "postedBy",
    "_id name"
  );
  res.send({ user, posts });
});

module.exports = router;
