const express = require("express");
const auth = require("../middleware/auth");
const { Post, validatePost } = require("../models/post");
const { User } = require("../models/user");
const router = express.Router();

router.get("/allpost", auth, async (req, res) => {
  const posts = await Post.find()
    .populate("postedBy", "_id name profilePic")
    .populate("comments.postedBy", "id_ name")
    .sort("-createdAt");
  res.send(posts);
});
router.get("/allfollowingpost", auth, async (req, res) => {
  const posts = await Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name profilePic")
    .populate("comments.postedBy", "id_ name")
    .sort("-createdAt");
  res.send(posts);
});

router.get("/mypost", auth, async (req, res) => {
  const post = await Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .sort("-createdAt");
  res.send(post);
});

router.post("/createpost", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message }); //send(error.details[0].message);

  const { caption, img } = req.body;
  req.user.password = undefined;
  const post = new Post({
    caption,
    photo: img,
    postedBy: req.user,
  });

  await post.save();
  res.send(post);
});

router.put("/like", auth, async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name profilePic")
    .populate("postedBy", "_id name profilePic");

  res.send(post);
});
router.put("/unlike", auth, async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id name profilePic")
    .populate("postedBy", "_id name profilePic");

  res.send(post);
});

router.put("/comment", auth, async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name profilePic")
    .populate("postedBy", "_id name profilePic");

  res.send(post);
});

router.delete("/deletepost/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id).populate("postedBy", "_id");

  if (!post) {
    return res.status(400).send("Invalid ID");
  }
  if (post.postedBy._id.toString() === req.user._id.toString()) {
    await post.remove();
    res.send("deleted successfully");
  }
});

router.put("/bookmarkPost", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { bookmarks: req.body.postId },
    },
    { new: true }
  ).select("-password");
  res.send(user);
});
router.put("/removeBookmarkPost", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { bookmarks: req.body.postId },
    },
    { new: true }
  ).select("-password");
  res.send(user);
});

router.get("/bookmarks", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  const data = user.bookmarks;

  const posts = await Post.find({ _id: { $in: data } }).populate(
    "postedBy",
    "_id name"
  );

  res.send(posts);
});

module.exports = router;
