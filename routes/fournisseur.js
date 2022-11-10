const express = require('express');
const router = express.Router()
const Fournisseur = require("../models/Fournisseur");
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const fournisseurById = require('../middleware/fournisseurById');
const { check, validationResult } = require('express-validator');

// @route   POST api/fournisseurs
// @desc    Create fournisseur
// @access  Private Admin
router.post('/', 
  [ check('title', 'Titre est requise').trim().not().isEmpty()],
  [ check('desc', 'Description est requise').trim().not().isEmpty()],
  auth, adminAuth, async(req, res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ error: errors.array()[0].msg })
  }

  const { title, desc } = req.body
  try {
    let fo = await Fournisseur.findOne({
      title, desc
    })

    if(fo){
      return res.status(403).json({
        error: 'Already exist'
      })
    }

    const newF = new Fournisseur({title, desc})
    fo = await newF.save()
    res.json(fo)
    console.log("F ++")

  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error')
  }

})


router.get('/all', async (req, res) => {
  try {
      let data = await Fournisseur.find({})
      res.json(data)
  } catch (error) {
      console.log(error)
      res.status(500).send('Server error')
  }
})

// @route   Put api/fournisseurs/:fournisseurId
// @desc    Update Single
// @access  Private Admin
router.put('/:fournisseurId', auth, adminAuth, fournisseurById, async (req, res) => {
  let fournisseur = req.fournisseur;
  const { title, desc } = req.body

  if (title) fournisseur.title = title.trim();
  if (desc) fournisseur.desc = desc.trim();

  try {
      fournisseur = await fournisseur.save()
      console.log("Update +")
      res.json(fournisseur)

  } catch (error) {
      console.log(error.message)
      res.status(500).send('Server error');
  }
})


router.delete('/:fournisseurId', auth, adminAuth, fournisseurById, async (req, res) => {
  let fournisseur = req.fournisseur;
  try {
      let deletedF = await fournisseur.remove()
      res.json({
          message: `${deletedF.title} deleted successfully`
      })
  } catch (error) {
      console.log(error.message)
      res.status(500).send('Server error');
  }
})

router.get('/:fournisseurId', fournisseurById, async (req, res) => {
  res.json(req.fournisseur)
})


module.exports = router;