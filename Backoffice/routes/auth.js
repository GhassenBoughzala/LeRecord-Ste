const router = require("express").Router();
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
  });

module.exports = router;