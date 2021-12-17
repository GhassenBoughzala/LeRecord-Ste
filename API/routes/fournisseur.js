const Fournisseur = require("../models/Fournisseur");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../helpers/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newFournisseur = new Fournisseur(req.body);
    
  try {
    const savedFournisseur = await newFournisseur.save();
    res.status(200).json(savedFournisseur);
    console.log("Fournisseur +");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedFournisseur = await Fournisseur.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFournisseur);
    console.log("Fournisseur Updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Fournisseur.findByIdAndDelete(req.params.id);
    res.status(200).json("Fournisseur has been deleted...");
    console.log("Fournisseur -");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Fournisseur
router.get("/find/:id", async (req, res) => {
  try {
    const Fournisseur = await Fournisseur.findById(req.params.id);
    res.status(200).json(Fournisseur);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Fournisseurs
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let Fournisseurs;

    if (qNew) {
      Fournisseurs = await Fournisseur.find().sort({ createdAt: -1 }).limit(1);
    } else {
      Fournisseurs = await Fournisseur.find();
    }
    res.status(200).json(Fournisseurs);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;