const mongoose  = require ('mongoose');
const Product = require('../models/Product');

module.exports = async function(req, res ){

    const { ProductId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(ProductId)){
        return res.status(403).json({
            error: 'Product 404 invalid ID '
        })
    }

    try {
        let product = await Product.findById(ProductId).populate('category')

        if(!Product){
            return res.status(403).json({
                error: 'Product 404'
            })
        }
        req.product = product


    } catch (error){
        console.log(error);
        res.send('Server Error');
    }
}