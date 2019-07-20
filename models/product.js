//const products = [];
const fs = require("fs");
const path = require("path");

const { rootDir } = require("../util/rootPath");
let p = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    //products.push(this);
    fs.readFile(p, "utf8", (err, fileData) => {
      let products = [];
      if (!err && fileData) {
        products = JSON.parse(fileData); // read the excisting data from file and assign to products array
      }

      products.push(this); // add object created on add-product form submit and push to products array
      // over write the products.json file with new data
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(p, "utf8", (err, data) => {
      if (err) {
        return cb([]);
      }
      if (!data) {
        return cb([]);
      }
      return cb(JSON.parse(data));
    });
    //return products;
  }
};
