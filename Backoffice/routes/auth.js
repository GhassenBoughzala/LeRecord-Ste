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
      console.log("Decrypt...");
      
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      console.log("Matching Pass...");
      OriginalPassword !== req.body.password && 
        res.status(401).json("Wrong Password !");
  
      const { password, ...others } = user._doc;
      res.status(200).json(others);
      console.log("Done");

    } catch (err) {
        console.error("NOP");
    }
  });

/*
//LOGIN V2
router.post("/login", async (req, res) => {

    User.findOne({username: req.body.username},
    function (err, user) {
        if (err) throw err
        if (!user) {
            console.log("User not found")
            res.status(403).send({
                    success: false,
                    msg: 'Authentication Failed, User not found'})
        } 
        else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    console.log("Matching Pass...")
                    var token = jwtt.encode(user, config.secret)
                    res.json({success: true, token: token})
                }
                else {
                    return res.status(403).send({success: false, msg: 'Authentication failed, wrong password'})
                }
            })
        }
    })  
}); 
*/
module.exports = router;