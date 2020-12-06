const express = require("express");
const auth = require("../middleware/auth");
const { Post, validatePost } = require("../models/post");
const router = express.Router();

router.get("/allpost", async (req, res) => {
  const posts = await Post.find().populate("postedBy", "_id name");
  res.send(posts);
});

router.get("/mypost", auth, async (req, res) => {
  const post = await Post.find({ postedBy: req.user._id }).populate(
    "postedBy",
    "_id name"
  );
  res.send(post);
});

router.post("/createpost", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, body, img } = req.body;
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo: img,
    postedBy: req.user,
  });

  await post.save();
  res.send(post);
});

module.exports = router;
