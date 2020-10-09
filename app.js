const express = require("express");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/auth_dash", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`The Server is running on port ${PORT}`);
});
