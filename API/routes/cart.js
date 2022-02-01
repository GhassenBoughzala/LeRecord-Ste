const Cart = require('../models/Cart')
const Product = require('../models/Product')
const auth = require('../middleware/auth');
//const adminAuth = require('../middleware/adminAuth');

const router = require("express").Router();

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    //you update code here

    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

router.post('/addcart', auth, (req, res) => {

    Cart.findOne({ user: req.body.user }).exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          //if cart already exists then update cart by quantity
          let promiseArray = [];
    
          req.body.cartItems.forEach((cartItem) => {
            const product = cartItem.product;
            const item = cart.cartItems.find((c) => c.product == product);
            let condition, update;
            if (item) {
              condition = { user: req.body.user, "cartItems.product": product };
              update = {
                $set: {
                  "cartItems.$": cartItem,
                },
              };
            } else {
              condition = { user: req.body.user };
              update = {
                $push: {
                  cartItems: cartItem,
                },
              };
            }
            promiseArray.push(runUpdate(condition, update));

          });
          Promise.all(promiseArray)
            .then((response) => res.status(201).json({ response }))
            .catch((error) => res.status(400).json({ error }));
        } else {
          //if cart not exist then create a new cart
          const cart = new Cart({
            user: req.body.user,
            cartItems: req.body.cartItems,
          });
          console.log(cart)
          cart.save((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (cart) {
              return res.status(201).json({ cart });
            }
          });
        }
      });

});

// new update remove cart items
router.post('/', auth, (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Cart.update(
      { user: req.user._id },
      {
        $pull: {
          cartItems: {
            product: productId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
});

module.exports = router;

