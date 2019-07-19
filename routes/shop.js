let express = require("express");
let path = require("path");
let rootPath = require("../util/rootPath");

let router = express.Router();

// get product controller
const { getProduct } = require("../controllers/product");

router.get("/", getProduct); // use controller in router

module.exports = router;
