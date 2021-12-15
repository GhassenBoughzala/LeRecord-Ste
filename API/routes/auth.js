/*const express = require('express')
const router = express.Router()

// Load Controllers
const {
    registerController,
    activationController,
    signinController,
    forgotPasswordController,
    resetPasswordController,
    googleController,
    facebookController
} = require('../controllers/authcontroller')


const {
    validSign,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/valid')

router.post('/register',
    validSign,
    registerController)

router.post('/login',
    validLogin, signinController)

//router.post('/activation', activationController)

// forgot reset password
router.put('/forgotpassword', forgotPasswordValidator, forgotPasswordController);
router.put('/resetpassword', resetPasswordValidator, resetPasswordController);

module.exports = router
*/
const {
  validSign,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../helpers/valid')
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", validSign, async (req, res) => {

  const errors = validationResult(req);
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "SEC"
    ).toString(),
  });

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    User.findOne({
      email}).exec((err,user) => {
          if (user){
            return res.status(400).json({
              errors: 'Email is taken'
            })
          }
      });
  } 


  try {

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log("User +1 ");
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN V1
router.post("/login", validLogin, async (req, res) => {

  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw Error('User does not exist');

    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, "JWT_SECRET", { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }

/*
    try {        
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(401).json("Wrong Username !");

      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        "SEC"
      );
      
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      OriginalPassword !== req.body.password && 
        res.status(401).json("Wrong Password !");

      const accessToken = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },"JWT",
            {expiresIn:"3d"}
          );
  
      const { password, ...others } = user._doc;
      res.status(200).json({...others, accessToken});
      console.log("Login +1 ");

    } catch (err) {
        console.error("Sorry !");
    }
*/

  });

module.exports = router;
