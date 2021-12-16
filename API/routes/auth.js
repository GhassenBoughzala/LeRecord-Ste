const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // to generate token
const bcrypt = require('bcryptjs'); // encrypt password
// Check validation for requests
const {
  check,
  validationResult
} = require('express-validator');
const gravatar = require('gravatar'); // get user image by email
const auth = require('../middleware/auth')
// Models
const User = require('../models/User');

// @route   POST api/user
// @desc    User Information
// @access  Private 
router.get('/', auth, async (req, res) => {
  try {
    // get user information by id 
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    console.log(err.message);
    res.status(500).send('Server Error')
  }
})

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post('/register',
  [
    // validation
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // get name and email and password from request
    const {
      name,
      email,
      password
    } = req.body;

    try {
      // Check if user already exist
      let user = await User.findOne({
        email
      });

      // If user exist
      if (user) {
        return res.status(400).json({
          errors: [{
            msg: 'User already exists',
          }, ],
        });
      }

      // If not exists
      // get image from gravatar
      const avatar = gravatar.url(email, {
        s: '200', // Size
        r: 'pg', // Rate,
        d: 'mm',
      });

      // create user object
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10); 
      user.password = await bcrypt.hash(password, salt); // use user password and salt to hash password
      await user.save();
      console.log("User +");

      // payload to generate token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET, {
          expiresIn: 360000, // for development for production it will 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
    } catch (error) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/user/login
// @desc    Login user
// @access  Public
router.post('/login', [
  // Validation for email and password
  check('email', 'please include a valid email').isEmail(),
  check('password', 'password is required').exists()
], async (req, res) => {
  // If error 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  // if everything is good
  // get email and password from request body
  const {email, password} = req.body;

  try {
    // find user
    let user = await User.findOne({email});

    // If user not found in database
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'Invalid credentials'}]
      })
    }

    // Know user founded by email let's compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    // passwords don't match
    if (!isMatch) {
      return res.status(400).json({
        errors: [{msg: 'Invalid credentials'}]
      })
    }

    // payload for jwt
    const payload = { user: {id: user.id} }

    jwt.sign(
      payload,
      process.env.JWT_SECRET, {
        expiresIn: 360000
      }, (err, token) => {
        if (err) throw err;
        res.json({
          token
        })
      }
    )
  } catch (error) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
})
module.exports = router

/*


const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const {
  validSign,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../helpers/valid')

//REGISTER
router.post("/register", validSign, async (req, res) => {

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "SEC"
    ).toString(),
  });

  try {

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id }, "JWT", {
      expiresIn: 3600
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email
      }
    });

    console.log("User +1 ");
    
  } catch (err) {
    res.status(500).json(err);
    console.error(Error);
  }

});

//LOGIN V1
router.post("/login", validLogin, async (req, res) => {

    try {        
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(401).json("Wrong Email !");
      
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,"SEC");

      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      OriginalPassword !== req.body.password && 
        res.status(401).json("Wrong Password !");

      const token = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },"JWT",
            {expiresIn:"3d"}
          );
      if (!accessToken) throw Error('Couldnt sign the token');

      const { password, ...others } = user._doc;

      res.status(200).json({...others, token});
      console.log("Login +1 ");

    } catch (err) {
        res.status(500).json(err);
        console.error("Sorry !");
    }

  });



module.exports = router;


*/