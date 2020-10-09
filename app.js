const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user");

mongoose
  .connect("mongodb://localhost:27017/auth_dash", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/** ROUTES */

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// Auth routes
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    // this will run the serialize user method
    passport.authenticate("local")(req, res, () => {
      res.redirect("/dashboard");
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

// middleware
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`The Server is running on port ${PORT}`);
});
