const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); // to generate token
const bcrypt = require("bcryptjs"); // encrypt password
// Check validation for requests
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
// Models
const User = require("../models/User");

// @route   POST api/user
// @desc    User Information
// @access  Private
router.get("/getuser", auth, async (req, res) => {
  try {
    // get user information by id
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/user/register
// @desc    Register user
// @access  Public

router.post(
  "/register",
  [
    // validation
    check("nom", "Le nom est requis").not().isEmpty(),
    check("prenom", "Le nom est requis").not().isEmpty(),
    check("email", "Veuillez inclure un email valide").isEmail(),
    check(
      "password",
      "Veuillez saisir un mot de passe de 6 caractères ou plus"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // get name and email and password from request
    const { nom, prenom, email, password } = req.body;

    try {
      // Check if user already exist
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "Utilisateur existe déjà" }],
        });
      }

      // create user object
      user = new User({ nom, prenom, email, password });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt); // use user password and salt to hash password

      const savedUser = await user.save();
      if (!savedUser) throw Error("Something went wrong saving the user");
      console.log("User +");

      // payload to generate token
      const payload = { user: { id: user.id } };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000, // for development for production it will 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
            savedUser,
          });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/user/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  [
    // Validation for email and password
    check("email", "Veuillez inclure un email valide").isEmail(),
    check("password", "Mot de passe est requis ").exists(),
  ],
  async (req, res) => {
    // If error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // if everything is good
    // get email and password from request body
    const { email, password } = req.body;

    try {
      // find user
      let user = await User.findOne({ email });
      // If user not found in database
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "Email incorrect" }],
        });
      }
      // Know user founded by email let's compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      // passwords don't match
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: "Mot de passe incorrect" }],
        });
      }

      // payload for jwt
      const payload = { user: { id: user.id } };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        }
      );
      console.log("Login ++");
    } catch (error) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
