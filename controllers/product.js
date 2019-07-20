const Product = require("../models/product");

module.exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    path: "admin/add-product",
    pageTitle: "Add Product"
  });
};

module.exports.postAddProduct = (req, res, next) => {
  let product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

module.exports.getProduct = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop", { products: products, path: "/", pageTitle: "Shop" });
  });

  //res.sendFile(path.join(rootPath, "views", "shop.html"));
};
