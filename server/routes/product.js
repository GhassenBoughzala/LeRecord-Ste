const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const productById = require("../middleware/productById");
const { validationResult } = require("express-validator");

// @route   Post api/product/
// @desc    Create a Product
// @access  Private Admin
router.post("/", auth, adminAuth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  let { name, description, category, fournisseur, shipping, photo } = req.body;
  //let images = req.files;

  if (!name | !description | !category | !fournisseur | !shipping | !photo) {
    return res.status(400).json({ error: "Verifier vos champs !" });
  } else if (name.length > 255 || description.length > 3000) {
    return res.status(400).json({
      error: "Name 255 & Description must not be 3000 charecter long",
    });
  } else {
    try {
      let newProduct = new Product({
        photo,
        name,
        description,
        category,
        fournisseur,
        shipping,
      });
      let save = newProduct.save();
      console.log("P+");
      if (save) {
        return res.json({ success: "Product created successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

// @route   Delete api/product/productId
// @desc    Delete a Product
// @access  Private Admin
router.delete("/:productId", auth, adminAuth, productById, async (req, res) => {
  let product = req.product;
  try {
    let deletedProduct = await product.remove();
    res.json({
      message: `${deletedProduct.name} deleted successfully`,
    });
    console.log("-P");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

//Update Product
router.put("/:productId", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

// @route   Get api/product/:productId
// @desc    Get a list of products  with filter
//  options(order = asc or desc, sortBy any product propert like name, limit, number of returned product)
// @access  Public
router.get("/list", async (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  try {
    let pc = await Product.find({})
      .select("-photo")
      .populate("category")
      .populate("fournisseur")
      .sort([[sortBy, order]])
      .limit(limit)
      .exec();

    res.json(pc);
  } catch (error) {
    console.log(error);
    res.status(500).send("Invalid querys");
  }
});
// @route   Get api/product/categories
// @desc    Get a list categories of products
// @access  Public
router.get("/categories", async (req, res) => {
  try {
    let categories = await Product.distinct("category");
    if (!categories) {
      return res.status(400).json({
        error: "Categories not found",
      });
    }
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route   Get api/product/fournisseurs
// @desc    Get a list fournisseurs of products
// @access  Public
router.get("/fournisseurs", async (req, res) => {
  try {
    let Fournisseurs = await Product.distinct("fournisseur");
    if (!categories) {
      return res.status(400).json({
        error: "Fournisseurs not found",
      });
    }
    res.json(Fournisseurs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route   Post api/product/filter
// @desc    filter a Product by price and category
// @access  Public
router.post("/filter", async (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  try {
    let products = await Product.find(findArgs)
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Products not found");
  }
});

// @route   Get api/product/search
// @desc    Get a list products by search quey
// @access  Public
router.get("/search", async (req, res) => {
  try {
    //let index = Product.createIndexes({ timestamp: 1 });
    let products = await Product.find({})
      .sort({
        description: 0,
        price: 0,
        quantity: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        sold: 0,
      })
      .populate("category", "name")
      .populate("fournisseur", "title");

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error to get products");
  }
});
// @route   Get api/product/:productId
// @desc    Get a list related to  product
// @access  Public
router.get("/related/:productId", productById, async (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
  let order = req.query.order ? req.query.order : "desc";

  try {
    let products = await Product.find({
      _id: {
        $ne: req.product,
      },
      category: req.product.category,
    })
      .select("-photo")
      .limit(limit)
      .sort([[sortBy, order]])
      .populate("category", "_id name")
      .populate("fournisseur", "_id title");

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Invalid querys");
  }
});

// @route   Get api/product/productId
// @desc    Get a Product information
// @access  Public
router.get("/:productId", productById, (req, res) => {
  return res.json(req.product);
});

//GET STATS
router.get("/stats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Product.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.param("productId", productById);

module.exports = router;
