const mongoose = require("mongoose");
const express = require("express");
const { MONOGOURI } = require("./config/keys");
const app = express();

const PORT = 3900;
mongoose
  .connect(MONOGOURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

require("./models/user");

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
