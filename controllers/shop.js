const Product = require("../models/product");
const Cart = require("../models/Cart");

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

module.exports.getProductDetail = (req, res, next) => {
  let id = req.params.id;
  Product.findById(id, product => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "product"
    });
  });
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
  Cart.getCart(cart => {
    console.log(cart);
    Product.fetchAll(products => {
      const cartProduct = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProduct.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "cart",
        cart: cartProduct
      });
    });
  });
};

module.exports.postCart = (req, res, next) => {
  proId = req.body.productId;
  Product.findById(proId, product => {
    Cart.addProduct(proId, product.price);
  });

  res.redirect("/cart");
};

module.exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("Id: ", prodId);
  Product.findById(prodId, product => {
    console.log("Product :", product);
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

module.exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Your Orders", path: "orders" });
};

module.exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "checkout" });
};
