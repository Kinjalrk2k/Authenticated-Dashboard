const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./model/user");

mongoose
  .connect("mongodb://localhost:27017/auth_dash", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));

const app = express();
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());
app.use(
  require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false,
  })
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
