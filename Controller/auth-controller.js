const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')




exports.userRegister = async (req, res) => {
    const { firstName, lastName, username, email, password, cpassword } = req.body;
    try {
        if (password == cpassword) {
            const hashedPassword = await bcrypt.hash(password, 10)
            const hashedCPassword = await bcrypt.hash(cpassword, 10)
            const newUser = new User({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                username: username.trim(),
                email: email.trim(),
                password: hashedPassword.trim(),
                cpassword: hashedCPassword.trim()
            })
            console.log(newUser)
            const savedUser = await newUser.save()
            return res.status(201).json(savedUser)
        } else {
            return res.status(400).json({ message: "Confirm password is not Matched" })
        }




    } catch (err) {
        return res.status(400).json(err.message)
    }

}

exports.login = async (req, res, next) => {
    // console.log(req.body)
    const { username, password } = req.body
    const finduser = await User.findOne({ username })
    console.log(finduser + " here is finded user")
    try {
        if (finduser != null) {
            if (password != '') {
                const matchpass = await bcrypt.compare(password, finduser.password)
                if (matchpass == true) {
                    const accessToken = await jwt.sign({
                        id: finduser._id,
                        isAdmin: finduser.isAdmin
                    }, process.env.JWT, { expiresIn: "5d" })
                    const { password, ...others } = finduser._doc;
                    res.cookie('jwt', accessToken)
                    return res.status(200).json({ ...others, accessToken })

                } else {

                    return res.status(404).json({ message: "Password Wrong " })
                }
            } else {
                return res.status(404).json({ message: "Please Fill Your Password" })

            }

        } else {

            return res.status(404).json({ message: "User Not  Found" })
        }



    } catch (err) {
        return res.status(500).json(err)
    }
}