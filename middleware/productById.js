const mongoose  = require ('mongoose');
const Product = require('../models/ProductLow');

module.exports = async function(req, res, next ){

    const { productId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(403).json({
            error: 'Product 404 invalid ID '
        })
    }

    try {
        
        let product = await Product
                    .findById(productId)
                    .populate('category')
                    .populate('fournisseur')

        if(!product){
            return res.status(403).json({
                error: 'Product 404'
            })
        }


        req.product = product
        next()

    } catch (error){
        console.log(error);
        res.send('Server Error');
    }
}