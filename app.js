const express = require("express"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
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

app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "That's a secret! ;)",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// user defined middleware - this makes req.user variable available to all the routes and templates
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

/** ROUTES */

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/dashboard", isLoggedIn, (req, res) => {
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

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    successFlash: "Logged you in!",
    failureFlash: "Incorrect credentials!",
  }),
  (req, res) => {}
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/login");
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`The Server is running on port ${PORT}`);
});
