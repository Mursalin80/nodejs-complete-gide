const Product = require("../models/product");

module.exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    path: "admin/add-product",
    pageTitle: "Add Product",
    editing: false
  });
};

module.exports.postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;
  let product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

module.exports.postEditProduct = (req, res, next) => {
  const { title, price, imageUrl, description, productId } = req.body;
  let product = new Product(productId, title, imageUrl, description, price);
  product.save();
  res.redirect("/admin/products");
};

module.exports.getEditProduct = (req, res, next) => {
  let editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  let prdoId = req.params.productId;
  Product.findById(prdoId, product => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      path: "admin/edit-product",
      pageTitle: "Add Product",
      editing: editMode,
      product: product
    });
  });
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

module.exports.postDeleteProduct = (req, res, next) => {
  const prodID = req.body.productId;
  Product.deleteById(prodID);
  res.redirect("/admin/products");
};
