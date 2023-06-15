const { verifyToken } = require('../VerifyToken');

const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);


router.post('/payment', async (req, res) => {
    // console.log(req.body)
    // console.log(req.body.tokenId.email)


    stripe.customers.create({
        email: req.body.tokenId.email,
        source: req.body.tokenId,
        name: req.body.name,
        address: req.body.tokenId.card
    })
        .then((customer) => {
            return stripe.charges.create({
                amount: req.body.amount,
                description: "Payment is Processing",
                currency: "INR",
                customer: customer.id
            })

        }).then((charge) => {
            console.log(charge)
            res.send("Success")
        }).catch((err) => {
            res.send(err)

        })
})


module.exports = router;


