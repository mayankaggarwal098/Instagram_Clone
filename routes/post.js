const express = require("express");
const auth = require("../middleware/auth");
const { Post, validatePost } = require("../models/post");
const router = express.Router();

router.get("/allpost", auth, async (req, res) => {
  const posts = await Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "id_ name");
  res.send(posts);
});
router.get("/allfollowingpost", auth, async (req, res) => {
  const posts = await Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "id_ name");
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
  if (error) return res.status(400).json({ error: error.details[0].message }); //send(error.details[0].message);

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

router.put("/like", auth, async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).populate("postedBy", "_id name");

  res.send(post);
});
router.put("/unlike", auth, async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  ).populate("postedBy", "_id name");

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
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name");

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

module.exports = router;
