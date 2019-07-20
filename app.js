const express = require("express");
let bodyParser = require("body-parser");
let path = require("path");

const { adminRouter } = require("./routes/admin");
const shopRouter = require("./routes/shop");

const app = express();

const { get404 } = require("./controllers/404"); //  get 404 controller

// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use(shopRouter);

// use 404 page controller if no page found
app.use(get404);

app.listen(3000);

console.log("App.js directy Path ", __dirname);
