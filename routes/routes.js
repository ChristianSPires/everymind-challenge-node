const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const multer = require("multer");
const products = require("../models/products");

// Image upload configuration
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("image");

// Insert a product into the database route
router.post("/add", upload, async (req, res) => {
  try {
    const product = new Product({
      image: req.file.filename,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });

    await product.save(); // Save the product without callback

    req.session.message = {
      type: "success",
      message: "Product added successfully!",
    };
    res.redirect("/");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
});

// Get all users route
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().exec(); // Execute the query with async/await
    res.render("index", {
      title: "Home Page",
      products: products,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/add", (req, res) => {
  res.render("add_products", { title: "Add Products" });
});

module.exports = router;
