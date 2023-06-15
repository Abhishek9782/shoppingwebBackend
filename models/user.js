const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,

    },
    email: {
        type: String,
        unique: true,

    },
    password: {
        type: String,


    },
    cpassword: {
        type: String,


    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    img: { type: String },
    firstName: String,
    lastName: String,




}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)