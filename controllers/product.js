let product = [];

module.exports.getAddProduct = (req, res, next) => {
  console.log("In Product Controller.");
  res.render("add-product", {
    path: "admin/add-product",
    pageTitle: "Add Product"
  });
};

module.exports.postAddProduct = (req, res, next) => {
  console.log("Request body: ", req.body);
  product.push({ title: req.body.title });
  res.redirect("/");
};

module.exports.getProduct = (req, res, next) => {
  console.log("In middleware shop.js");
  res.render("shop", { product: product, path: "/", pageTitle: "Shop" });
  //res.sendFile(path.join(rootPath, "views", "shop.html"));
};
