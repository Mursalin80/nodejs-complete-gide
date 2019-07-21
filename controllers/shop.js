const Product = require("../models/product");

module.exports.getProduct = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      products: products,
      path: "products",
      pageTitle: "Shop"
    });
  });

  //res.sendFile(path.join(rootPath, "views", "shop.html"));
};

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      products: products,
      path: "/",
      pageTitle: "All Products"
    });
  });
};

module.exports.getCart = (req, res, next) => {
  res.render("shop/cart", { pageTitle: "Your Cart", path: "cart" });
};

module.exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Your Orders", path: "orders" });
};

module.exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "checkout" });
};
