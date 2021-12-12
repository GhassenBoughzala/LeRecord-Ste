const express = require('express')
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

router.post('/activation', activationController)

// forgot reset password
router.put('/forgotpassword', forgotPasswordValidator, forgotPasswordController);
router.put('/resetpassword', resetPasswordValidator, resetPasswordController);

module.exports = router

/*const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "SEC"
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log("User +1 ");
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN V1
router.post("/login", async (req, res) => {
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

//LOGOUT
router.get("/logout", async (req, res) => {

  res.status(200).send({ auth: false, accessToken:null, msg: 'Logout'});
  console.log("USER OUT !");

});


  });

module.exports = router;

*/