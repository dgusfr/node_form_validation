const bodyParser = require("body-parser");
var express = require("express");
var session = require("express-session");
var flash = require("connect-flash");
var app = express();

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(flash());

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
