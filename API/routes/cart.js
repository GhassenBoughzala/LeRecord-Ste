const Cart = require("../models/Cart");
const router = require("express").Router();
const auth = require('../middleware/auth');
//const adminAuth = require('../middleware/adminAuth');
const { validationResult } = require('express-validator');

//CREATE
router.post("/", auth, async (req, res) => {
  const newCart = new Cart(req.body);

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(402).json({ error: errors.array()[0].msg })
  }

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
    console.log("Cart +");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL
router.get("/", auth, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;