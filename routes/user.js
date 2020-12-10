const express = require("express");
const auth = require("../middleware/auth");
const { Post, validatePost } = require("../models/post");
const { User } = require("../models/user");

const router = express.Router();

router.get("/user/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).send("User Not Found");
  const posts = await Post.find({ postedBy: req.params.id }).populate(
    "postedBy",
    "_id name"
  );
  res.json({ user, posts });
});

router.put("/follow", auth, async (req, res) => {
  await User.findByIdAndUpdate(
    req.body.otherUserId,
    {
      $push: { followers: req.user._id },
    },
    { new: true }
  );

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { following: req.body.otherUserId },
    },
    { new: true }
  );
  res.send(user);
});
router.put("/unfollow", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.body.otherUserId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.otherUserId },
        },
        { new: true }
      );
    }
  );
  res.send(user);
});

module.exports = router;
