const mongoose = require('mongoose')
const {
    ObjectId
} = mongoose.Schema;

const productLowSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200
    },
    description: {
        type: String,
        maxlength: 2000
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    fournisseur: {
        type: ObjectId,
        ref: 'Fournisseur',
        required: true
    },
    photo: {
        type: Array,
        required: true,
    },
    shipping: {
        type: String,
        required: false,
        
    }
})

module.exports = mongoose.model("ProductLow", productLowSchema)