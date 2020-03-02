const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const app = express();

mongoose
  .connect("mongodb://localhost/bookApi", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

app.locals.title = "Express - Generated with IronGenerator";

const whitelist = ["http://localhost:3001", "http://localhost:3002"];

const corsConfig = {
  origin: (origin, cb) => {
    cb(null, whitelist.includes(origin));
  },
  credentials: true
};
app.use(cors(corsConfig));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", require("./routes/auth"));

require("./passport/authenticateToken");
app.use(passport.initialize());
app.use(passport.authenticate("jwt", { session: false }));

app.use("/books", require("./routes/books"));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
