const express = require("express"),
  app = express(),
  methodOverride = require("method-override");

require("dotenv").config();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use("/", require("./routes/index"));

module.exports = app;