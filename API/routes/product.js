const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const formidable = require('formidable');
const fs = require('fs');
const productById = require('../middleware/productById');
const _ = require('lodash');
const { send } = require('process');
const { validationResult } = require('express-validator');


// @route   Post api/product/
// @desc    Create a Product
// @access  Private Admin
router.post('/', auth, adminAuth, async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ error: errors.array()[0].msg })
    }
    const {
        name,
        description,
        price,
        category,
        fournisseur,
        quantity,
        photo,
        shipping
    } = req.body;

    try {
        let pp = await Product.findOne({
            name,
            description,
            price,
            category,
            fournisseur,
            quantity,
            photo,
            shipping
        })
    
        if(pp){
          return res.status(403).json({
            error: 'Already exist'
          })
        }
    
        const newP = new Product({
            name,
            description,
            price,
            category,
            fournisseur,
            quantity,
            photo,
            shipping})
        pp = await newP.save()
        
        console.log("+P");
            res.json({
                message: `${pp.name} IN BD !`,
            });
    
      } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
      }


});


// @route   Delete api/product/productId
// @desc    Delete a Product
// @access  Private Admin
router.delete('/:productId', auth, adminAuth, productById, async (req, res) => {
    let product = req.product;
    try {
        let deletedProduct = await product.remove();
        res.json({
            message: `${deletedProduct.name} deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

// @route   Put api/product/:productId
// @desc    Update Single product
// @access  Private Admin
router.put('/:productId', auth, adminAuth, productById, async (req, res) => {
        let product = req.product;
        const {
            name,
            description,
            price,
            category,
            fournisseur,
            quantity,
            photo,
            shipping
        } = req.body;

        if (name) product.name = name.trim();
        if (description) product.description = description.trim();
        if (price) product.price = price.toString().trim();
        if (category) product.category = category.trim();
        if (fournisseur) product.fournisseur = fournisseur.trim();
        if (quantity) product.quantity = quantity.toString().trim();
        if (photo) product.photo = photo.trim();
        if (shipping) product.shipping = shipping.trim();

        try {
            product = await product.save()
            console.log("Update +")
            res.json(product)

        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }

});



// @route   Get api/product/:productId
// @desc    Get a list of products  with filter 
//  options(order = asc or desc, sortBy any product propert like name, limit, number of returned product)
// @access  Public
router.get('/list', async (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    try {
        let pc = await Product.find({})
            .select('-photo')
            .populate('category')
            .populate('fournisseur')
            .sort([ [sortBy, order] ])
            .limit(limit).exec();
        
        res.json(pc);
    } catch (error) {
        console.log(error);
        res.status(500).send('Invalid querys');
    }
});
// @route   Get api/product/categories
// @desc    Get a list categories of products
// @access  Public
router.get('/categories', async (req, res) => {
    try {
        let categories = await Product.distinct('category')
        if (!categories) {
            return res.status(400).json({
                error: 'Categories not found'
            });
        }
        res.json(categories);

    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

// @route   Get api/product/fournisseurs
// @desc    Get a list fournisseurs of products
// @access  Public
router.get('/fournisseurs', async (req, res) => {
    try {
        let Fournisseurs = await Product.distinct('fournisseur')
        if (!categories) {
            return res.status(400).json({
                error: 'Fournisseurs not found'
            });
        }
        res.json(Fournisseurs);

    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

// @route   Post api/product/filter
// @desc    filter a Product by price and category
// @access  Public
router.post('/filter', async (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    try {
        let products = await Product.find(findArgs)
            .select('-photo')
            .populate('category')
            .sort([
                [sortBy, order]
            ])
            .skip(skip)
            .limit(limit);
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Products not found');
    }

})

// @route   Get api/product/search
// @desc    Get a list products by search quey 
// @access  Public
router.get("/search", async (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = {
            $regex: req.query.search,
            $options: 'i'
        };
        // assigne category value to query.category
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
    }
    try {
        let products = await Product.find(query).select('-photo');
        res.json(products);

    } catch (error) {
        console.log(error)
        res.status(500).send('Error to get products')
    }

})
// @route   Get api/product/:productId
// @desc    Get a list related to  product 
// @access  Public
router.get('/related/:productId', productById, async (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
    let order = req.query.order ? req.query.order : 'desc';

    try {
        let products = await Product.find({
                _id: {
                    $ne: req.product
                },
                category: req.product.category
            }).select('-photo')
            .limit(limit)
            .sort([
                [sortBy, order]
            ])
            .populate('category', '_id name')
            .populate('fournisseur', '_id title')

        res.json(products);

    } catch (error) {
        console.log(error);
        res.status(500).send('Invalid querys');
    }

})

// @route   Get api/product/productId
// @desc    Get a Product information
// @access  Public
router.get('/:productId', productById, (req, res) => {
    return res.json(req.product);
});


// @desc    Get Product Stats
// @access  Public
router.get("/stats", async (req, res) => {

  try {
    const data = await Product.aggregate([
      {
        $project: {
          quantity: { $quantity: "$quantity" },
        },
      },
      {
        $group: {
          quantity: "$quantity",
          total: { $sum: 1 },
        },
      },
    ]);
    console.log(data)
    res.status(200).json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.param("productId", productById);

module.exports = router;


/*
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../helpers/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
    
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
    console.log("Product +");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
    console.log("Product Updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
    console.log("Product -");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

*/