let express = require("express");
let path = require("path");
let rootPath = require("../util/rootPath");

// product controlls
const {
  getAddProduct,
  postAddProduct,
  getProducts
} = require("../controllers/admin");

let router = express.Router();

// use get add product controller
router.get("/add-product", getAddProduct);
router.get("/products", getProducts);

// use post add product controller
router.post("/product", postAddProduct);

module.exports.adminRouter = router;
