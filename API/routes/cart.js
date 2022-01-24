const Cart = require('../models/Cart')
const Product = require('../models/Product')
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = require("express").Router();


router.get('/:id', auth,async (req,res) => {
  const userId = req.params.id;
  try{
      let cart = await Cart.findOne({userId});
      if(cart && cart.items.length>0){
          res.send(cart);
      }
      else{
          res.send(null);
      }
  }
  catch(err){
      console.log(err);
      res.status(500).send("Something went wrong");
  }
});

router.post('/:id', async (req,res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  try{

      let cart = await Cart.findOne({userId: userId});
      let item = await Product.findOne({productId});
      
      if(!item){
          res.status(404).send('Item not found!')
      }
      //const price = item.price;
      //const name = item.name;
      
      if(cart){
          // if cart exists for the user
          let itemIndex = cart.items.findIndex(p => p.productId == productId);
          // Check if product exists or not
          if(itemIndex > -1)
          {
              let productItem = cart.items[itemIndex];
              productItem.quantity += quantity;
              cart.items[itemIndex] = productItem;
          } else {
              cart.items.push({ productId, quantity });
          }
          //cart.bill += quantity*price;
          cart = await cart.save();
          return res.status(201).send(cart);   
          console.log("Cart");    

      } else {
          // no cart exists, create one
          const newCart = await Cart.create({
              userId,
              items: [{ productId, quantity }],
              //bill: quantity*price
          });
          return res.status(201).send(newCart);
          console.log("newCart");
      }       
  }
  catch (err) {
      console.log(err);
      res.status(500).send(err);
  }
})


router.delete('/:userId/:itemId',auth , async (req,res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;
  try{
      let cart = await Cart.findOne({userId});
      let itemIndex = cart.items.findIndex(p => p.productId == productId);
      if(itemIndex > -1)
      {
          let productItem = cart.items[itemIndex];
          //cart.bill -= productItem.quantity*productItem.price;
          cart.items.splice(itemIndex,1);
      }
      cart = await cart.save();
      return res.status(201).send(cart);
  }
  catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
  }
})

module.exports = router;

