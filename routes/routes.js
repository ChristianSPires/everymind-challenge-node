const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const multer = require("multer");
const fs = require("fs");

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

// Get all products route
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

// Insert a product into the database route
router.post("/add", upload, async (req, res) => {
  try {
    const price = parseFloat(req.body.price).toFixed(2);

    const product = new Product({
      image: req.file.filename,
      name: req.body.name,
      description: req.body.description,
      price: price,
    });

    await product.save();

    req.session.message = {
      type: "success",
      message: "Product added successfully!",
    };
    res.redirect("/");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
});

router.get("/add", (req, res) => {
  res.render("add_products", { title: "Add Products" });
});

// Edit a product route
router.get("/edit/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.session.message = {
        type: "danger",
        message: "Product not found!",
      };
      return res.redirect("/");
    }
    res.render("edit_products", {
      title: "Edit Product",
      product: product,
    });
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
});

// Update product route
router.post("/update/:id", upload, async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const product = await Product.findOne({ id: productId });
    if (!product) {
      req.session.message = {
        type: "danger",
        message: "Product not found!",
      };
      return res.redirect("/");
    }

    // Determine the new image filename
    let new_image = req.body.old_image;
    if (req.file) {
      new_image = req.file.filename;
      // Delete the old image
      try {
        fs.unlinkSync("./uploads/" + req.body.old_image);
      } catch (err) {}
    }

    const price = parseFloat(req.body.price).toFixed(2);

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = price;
    product.image = new_image;

    await product.save();

    req.session.message = {
      type: "success",
      message: "Product updated successfully!",
    };
    res.redirect("/");
  } catch (err) {
    res.status(500).json({ message: "Internal server error", type: "danger" });
  }
});

// Delete product route
router.get("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      req.session.message = {
        type: "danger",
        message: "Product not found!",
      };
      return res.redirect("/");
    }

    // Check if product has an associated image and delete it
    if (product.image) {
      try {
        fs.unlinkSync(`./uploads/${product.image}`);
      } catch (err) {
        console.error(`Failed to delete image file: ${err.message}`);
      }
    }

    req.session.message = {
      type: "success",
      message: "Product deleted successfully!",
    };
    res.redirect("/");
  } catch (err) {
    console.error(`Error deleting product: ${err.message}`);
    res.status(500).json({ message: "Internal server error", type: "danger" });
  }
});

module.exports = router;
