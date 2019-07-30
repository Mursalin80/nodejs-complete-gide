//const products = [];
const fs = require("fs");
const path = require("path");
const Cart = require("./Cart");

const { rootDir } = require("../util/rootPath");
let p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = cb => {
  // read the excisting data from file and return Array of Object
  fs.readFile(p, "utf8", (err, fileContent) => {
    if (err || !fileContent) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, img, desc, price) {
    this.id = id;
    this.title = title;
    this.image = img;
    this.description = desc;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProdIndx = products.findIndex(
          prod => prod.id === this.id
        );
        const updtedProduct = [...products];
        updtedProduct[existingProdIndx] = this;
        fs.writeFile(p, JSON.stringify(updtedProduct), err => {
          console.log(err);
        });
      } else {
        this.id = Math.floor(Math.random() * 100000).toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      console.log("ID :", id);
      const product = products.find(prod => prod.id === id);
      console.log(product.title);
      const updatedProduct = products.filter(p => p.id !== id);
      console.log(updatedProduct);
      fs.writeFile(p, JSON.stringify(updatedProduct), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
        if (err) {
          console.log("Error : ", err);
        }
      });
    });
  }
};
