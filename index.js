const mongoose = require("mongoose");
const express = require("express");
const { MONOGOURI } = require("./config/keys");
const app = express();

const PORT = 3000;
mongoose
  .connect(MONOGOURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

require("./models/user");

app.use(express.json());
app.use(require("./routes/auth"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
