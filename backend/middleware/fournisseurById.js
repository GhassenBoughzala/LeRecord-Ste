const mongoose = require('mongoose')
const Fournisseur = require('../models/Fournisseur')

module.exports = async function (req, res, next) {
    const { fournisseurId } = req.params

    if (!mongoose.Types.ObjectId.isValid(fournisseurId)) {
        return res.status(403).json({
            error: 'Fournisseur not founded'
        })
    }

    try {
        let fournisseur = await Fournisseur.findById(fournisseurId)

        if (!fournisseur) {
            return res.status(403).json({
                error: 'Fournisseur not founded'
            })
        }

        req.fournisseur = fournisseur
        next()
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}