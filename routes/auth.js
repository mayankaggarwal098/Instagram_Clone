//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
const { User, validateSignup, validateSignin } = require("../models/user");
const { jwtPrivateKey } = require("../config/keys");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

router.post("/signup", async (req, res) => {
  const { error } = validateSignup(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({ name, email, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  // transporter.sendMail({
  //   to: user.email,
  //   from: "no-reply@insta.com",
  //   subject: "signup success",
  //   html: "<h1>welcome to instagram</h1>",
  // });
  res.send(user);
});

router.post("/signin", async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { password } = req.body;
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign({ _id: user._id }, jwtPrivateKey);
  const { _id, name, email, followers, following, profilePic } = user;
  //res.send(token);
  res.json({
    token,
    user: { _id, name, email, followers, following, profilePic },
  });
});

module.exports = router;
