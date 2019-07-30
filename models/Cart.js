const fs = require("fs");
const path = require("path");

const { rootDir } = require("../util/rootPath");
let p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, "utf8", (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      // Fetch the previous cart
      if (!err && fileContent) {
        cart = JSON.parse(fileContent);
      }
      const existProdIndex = cart.products.findIndex(prod => prod.id === id);
      const existProd = cart.products[existProdIndex];
      let updateProduct;

      if (existProd) {
        // increase quentity
        updateProduct = { ...existProd };
        updateProduct.qty = updateProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existProdIndex] = updateProduct;
      } else {
        updateProduct = { id: id, qty: 1 }; // add new product
        cart.products = [...cart.products, updateProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, "utf8", (err, fileContents) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContents) };
      const product = updatedCart.products.find(prod => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(pro => pro.id !== id);
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, "utf8", (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
