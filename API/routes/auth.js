
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
        console.error("Sorry !");
    }

  });

module.exports = router;
