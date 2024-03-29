const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const app = express();
const path = require("path");
require("dotenv").config();
const PORT = Number(process.env.PORT) || 3000;
const reminderRoute = require("./routes/reminderRoute");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "/public")));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("User details are: ");
  console.log(req.user);
  console.log("Entire session object:");
  console.log(req.session);
  console.log("Session details are: ");
  console.log(req.session.passport);
  console.log("/******************");
  next();
});


app.use("/auth", authRoute);
app.use("/reminder", reminderRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
