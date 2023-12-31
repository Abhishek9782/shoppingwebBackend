const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,

    },
    desc: {
        type: String,
        required: true,

    },
    img: {
        type: String,
        required: true,

    },
    category: {
        type: Array,
    },
    size: {
        type: Array,
    },
    color: {
        type: Array,
    },
    price: {
        type: String,
        required: true
    },
    instock: {
        type: Boolean,
        default: true
    }


}, {
    timestamps: true
})


module.exports = mongoose.model('product', productSchema)