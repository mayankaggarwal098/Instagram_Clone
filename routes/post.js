const express = require("express");
const auth = require("../middleware/auth");
const { Post, validatePost } = require("../models/post");
const router = express.Router();

router.post("/createpost", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, body } = req.body;
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    postedBy: req.user,
  });

  await post.save();
  res.send(post);
});

module.exports = router;
