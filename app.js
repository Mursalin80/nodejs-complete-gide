const express = require("express");
let bodyParser = require("body-parser");
let path = require("path");

const { adminRouter } = require("./routes/admin");
const shopRouter = require("./routes/shop");

const app = express();

// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
  //res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);

console.log("App.js directy Path ", __dirname);
