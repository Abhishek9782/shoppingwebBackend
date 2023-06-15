const bcrypt = require('bcrypt');
const User = require('../models/user');


exports.updateUser = async (req, res, next) => {
    const id = req.params.id;
    if (req.body.password) {
        const hashPass = await bcrypt.hash(req.body.password, 10)
    }
    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })

        res.status(200).json({ updateUser: updateUser, message: "User SucessFully Updated.." })

    } catch (err) {
        return res.status(500).json(err)
    }

}
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id)

        return res.status(200).json("Account Successfully Deleted")

    } catch (err) {
        return res.status(500).json(err)
    }
}
exports.getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id)
        const { password, ...others } = user._doc;

        return res.status(200).json(others)

    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getAllUser = async (req, res) => {
    const query = req.query.new;
    console.log(query)
    try {
        const user = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        return res.status(200).json(user)

    } catch (err) {
        return res.status(500).json(err)
    }
}


exports.State = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    console.log(lastYear)
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }

        ]);
        console.log("this is data", data)

        res.status(200).json(data)

    } catch (err) {
        res.status(500).json(err)
    }

}