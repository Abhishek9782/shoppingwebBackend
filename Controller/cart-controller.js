const Cart = require('../models/cart')



// Create cart
exports.Cartadd = async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        return res.status(200).json(savedCart)

    } catch (err) {
        return res.status(500).json(err)
    }

}

// Update Cart

exports.updateCart = async (req, res) => {
    const id = req.params.id;

    try {
        const updateCart = await Cart.findByIdAndUpdate(id, {
            $set: req.body,
        }, { new: true })
        return res.status(200).json(updateCart)

    } catch (err) {
        return res.status(500).json(err)
    }

}


// Delete Cart

exports.deleteCart = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteCart = await Cart.findByIdAndDelete(id)
        return res.status(200).json("Cart Delete SuccessFully...")

    } catch (err) {
        return res.status(500).json(err)
    }

}


// GET User Cart 

exports.getUserCart = async (req, res) => {
    const id = req.params.id;

    try {
        const cart = await Cart.findOne({ userId: req.params.userId })
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }

}

//  Get All

exports.getAll = async (req, res) => {
    try {
        const allcart = await Cart.find()
        res.status(200).json(allcart)

    } catch (err) {
        res.status(500).json(err)
    }

}