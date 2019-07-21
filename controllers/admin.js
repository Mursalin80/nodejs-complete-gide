const Product = require("../models/product");

module.exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    path: "admin/add-product",
    pageTitle: "Add Product"
  });
};

module.exports.postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;
  let product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      products: products,
      path: "admin/products",
      pageTitle: "All Products"
    });
  });
};
