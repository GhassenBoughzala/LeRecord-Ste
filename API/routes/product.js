const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const productById = require('../middleware/productById');
const { validationResult } = require('express-validator');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads');
  },
  filename: function(req, file, cb) {   
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

function deleteImages (images, mode) {
    var basePath = path.resolve(__dirname + '../') + 'uploads';
    console.log(basePath);
    for (var i = 0; i < images.length; i++) {
      let filePath = ''
      if (mode == 'file') {
        filePath = basePath + `${images[i].filename}`;
      } else {
        filePath = basePath + `${images[i]}`;
      }
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        console.log("Exists image");
    }
      fs.unlink(filePath, (err) => {
        if (err) {
          return err;
        }
      });
    }
  }

// @route   Post api/product/
// @desc    Create a Product
// @access  Private Admin
router.post('/', auth, adminAuth,
                upload.any(), async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(402).json({ error: errors.array()[0].msg })
    }

    let {
        name,
        description,
        category,
        fournisseur,
        price,
        quantity,
        shipping,
    } = req.body;
    let images = req.files;

    if(
        !name | 
        !description | 
        !category |
        !fournisseur |
        !price |
        !quantity |
        !shipping)
        {
            Product.deleteImages(images, 'file');
            return res.json({ error: "All filled must be required"})
        }

        else if (name.length > 255 || description.length > 3000){
            Product.deleteImages(images, 'file');
            return res.json({
                error: "Name 255 & Description must not be 3000 charecter long",
              });
        } else {
            try{
                let allImages = [];
                for (const img of images){
                    allImages.push(img.filename);
                }
                let newProduct = new Product({
                    photo: allImages,
                    name,
                    description,
                    category,
                    fournisseur,
                    price,
                    quantity,
                    shipping,
                });
                let save = newProduct.save();
                console.log("P++");
                console.log(allImages);
                if(save) {
                    return res.json({ success: "Product created successfully"  })
                    
                }
            }catch (err){
                console.log(err);
            }
        }


/*
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      fournisseur: req.body.fournisseur,
      price: req.body.price,
      quantity: req.body.quantity,
      photo: req.file.filename,
      shipping: req.body.shipping
    });
      try {
        newProduct.save()
        .then(() => res.json("P ++"))
        console.log("PRODUCT IN BD !!")
        
      } catch (error) {
        console.log(error)
        
      }

*/
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
router.put('/:productId', 
            upload.any(), 
            auth, adminAuth, productById,
            async (req, res) => {

                let {
                    ID,
                    name,
                    description,
                    category,
                    fournisseur,
                    price,
                    quantity,
                    shipping,
                } = req.body;
                let editimages = req.files;

                if(
                    !ID |
                    !name | 
                    !description | 
                    !category |
                    !fournisseur |
                    !price |
                    !quantity |
                    !shipping)
                    {
                        return res.json({ error: "All filled must be required"})
                    }
                    else if (name.length > 255 || description.length > 3000){
                        return res.json({
                            error: "Name 255 & Description must not be 3000 charecter long",
                          });
                    } else {           
                            let editData = {
                                name,
                                description,
                                category,
                                fournisseur,
                                price,
                                quantity,
                                shipping,
                            };
                            if (editimages.length == 2){
                                let allEditImages = [];
                                for (const img of editimages){
                                    allEditImages.push(img.filename);
                                }
                                editData = {...editData, photo: allEditImages};
                                Product.deleteImages(photo.split(','), 'string');
                            }
                        try{
                            let editProduct = Product.findByIdAndUpdate(ID, editData);
                            console.log("100% Updated")
                            editProduct.exec((err) => {
                                if (err) console.log(err);
                                return res.json({ success: "Product edit successfully"});
                            });
                        }catch (err){
                            console.log(err);
                        }
                    }



            }) 

/*
            Product.findById(req.params.id)
            .then((product) => {
              product.name= req.body.name,
              product.description= req.body.description,
              product.category =req.body.category,
              product.fournisseur= req.body.fournisseur,
              product.quantity= req.body.quantity,
              product.photo= req.file.filename,
              product.shipping= req.body.shipping;

              product        
              .save()
              .then(() => res.json("P UPDATED"))
              .catch((err) => res.json(400).json(`Error: ${err}`))
              });
*/
 
/*             
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
*/




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
        let products = await Product.find({});
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

router.param("productId", productById);

module.exports = router;
