//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
const { User, validateSignup, validateSignin } = require("../models/user");
const { jwtPrivateKey } = require("../config/keys");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
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
  transporter.sendMail({
    to: user.email,
    from: "aggarwalmayank3515@gmail.com",
    subject: "Welcome to INSTA-CLONE",
    html: "<h2>Successfully Signed up to INSTA-CLONE</h2>",
  });
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
  const {
    _id,
    name,
    email,
    followers,
    following,
    profilePic,
    bookmarks,
  } = user;
  //res.send(token);
  res.json({
    token,
    user: { _id, name, email, followers, following, profilePic, bookmarks },
  });
});

router.post("/updatePassword", async (req, res) => {
  const { password, token } = req.body;
  const user = await User.findOne({
    resetToken: token,
    expireTokenTime: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).send("Session Expired");
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.resetToken = undefined;
  user.expireTokenTime = undefined;

  await user.save();
  transporter.sendMail({
    to: user.email,
    from: "aggarwalmayank3515@gmail.com",
    subject: "Password Updated Successfully",
    html: "<h2>Your Insta-Clone account Password is updated</h2>",
  });
  res.send("Password Updated Successfully");
});

router.post("/resetPassword", async (req, res) => {
  crypto.randomBytes(32, async (err, buf) => {
    if (err) throw err;

    const token = buf.toString("hex");
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User not Registered");
    user.resetToken = token;
    user.expireTokenTime = Date.now() + 7200000; //2Hr
    await user.save();
    transporter.sendMail({
      to: user.email,
      from: "aggarwalmayank3515@gmail.com",
      subject: "Password Reset of Insta-Clone",
      html: `<h4>You  requested for reset password <br>Please click on this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h4>`,
    });
    res.send("Check your Mail");
  });
});

module.exports = router;
