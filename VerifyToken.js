const jwt = require('jsonwebtoken');
const User = require('./models/user')



const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(" ")[1]
        // console.log(token)
        let isVerify = await jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return res.status(498).json({ message: "You are not authenticate" })
            req.user = user;
            next()
        })

    } else {
        return res.status(498).json({ message: "You are not Authenticate" })
    }

}


const verifyTokenandAuthorization = (req, res, next) => {

    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json("You are not allowed to do that ! ")
        }
    })
}

const verifytokenandAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json("You are not allowed to do that ! ")
        }
    })
}

module.exports = { verifyToken, verifyTokenandAuthorization, verifytokenandAdmin }