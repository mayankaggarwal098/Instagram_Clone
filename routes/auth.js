const { User, validateSignup, validateSignin } = require("../models/user");
const { jwtPrivateKey } = require("../config/keys");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

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
  res.send(user);
});

router.post("/signin", async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign({ _id: user._id }, jwtPrivateKey);
  res.send(token);
});

module.exports = router;
