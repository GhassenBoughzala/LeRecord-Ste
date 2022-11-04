const mongoose = require('mongoose')
const {
    ObjectId
} = mongoose.Schema;

const productSchema = new mongoose.Schema({
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
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        type: Array,
        required: true,
    },
    shipping: {
        type: String,
        required: false,
        
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)