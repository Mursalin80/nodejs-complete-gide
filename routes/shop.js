let express = require("express");
let path = require("path");
let rootPath = require("../util/rootPath");

let router = express.Router();

// get product controller
const {
  getProduct,
  getIndex,
  getCart,
  getCheckout,
  getOrders
} = require("../controllers/shop");

router.get("/", getIndex); // use controller in router

router.get("/products", getProduct);

router.get("/cart", getCart);
router.get("/orders", getOrders);

router.get("/checkout", getCheckout);

module.exports = router;
