const Order = require('../models/order')



// Create Order
exports.orderadd = async (req, res) => {
    console.log(req.body)
    const newOrder = new Order(req.body)
    try {
        const savedorder = await newOrder.save()
        return res.status(200).json(savedorder)

    } catch (err) {
        return res.status(500).json(err)
    }

}

// Update Order

exports.updateOrder = async (req, res) => {
    const id = req.params.id;

    try {
        const updateOrder = await Order.findByIdAndUpdate(id, {
            $set: req.body,
        }, { new: true })
        return res.status(200).json(updateOrder)

    } catch (err) {
        return res.status(500).json(err)
    }

}


// Delete Order

exports.deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteOrder = await Order.findByIdAndDelete(id)
        return res.status(200).json("Order Delete SuccessFully...")

    } catch (err) {
        return res.status(500).json(err)
    }

}


// GET User Order

exports.getUserOrder = async (req, res) => {
    const id = req.params.id;

    try {
        const order = await Order.findOne({ userId: req.params.userId })
        res.status(200).json(order)
    } catch (err) {
        res.status(500).json(err)
    }

}

//  Get All order

exports.getAllorder = async (req, res) => {
    try {
        const allorder = await Order.find()
        res.status(200).json(allorder)

    } catch (err) {
        res.status(500).json(err)
    }

}


//  Get Monthaly Income


exports.getIncome = async (req, res) => {
    const productId = req.params.pid
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    try {

        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth }, ...(productId && {
                        products: {
                            $elemMatch: { productId }
                        }
                    })
                }
            },
            {

                $project: {
                    month: { $month: "$createdAt", },
                    sales: "$amount"
                }

            },
            {
                $group: {
                    _id: "$month", totalAmount: { $sum: "$sales" }
                }
            }
        ])


        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err)
    }

}