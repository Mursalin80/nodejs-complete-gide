let express = require("express");
let path = require("path");
let rootPath = require("../util/rootPath");

// product controlls
const { getAddProduct, postAddProduct } = require("../controllers/product");

let router = express.Router();

// use get add product controller
router.get("/add-product", getAddProduct);

// use post add product controller
router.post("/product", postAddProduct);

module.exports.adminRouter = router;
