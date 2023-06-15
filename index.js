const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT;
const cookieParser = require('cookie-parser')
const Session = require('express-session')






//  Middleware----------
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(Session({
    secret: 'abhishek',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Put true if https
}))

//  Router calling
const auth = require('./Route/auth')
const user = require('./Route/user')
const order = require('./Route/order')
const cart = require('./Route/cart')
const product = require('./Route/product')
const stripe = require('./Route/stripe')







//  Router Conect 
app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/cart', cart)
app.use('/api/order', order)
app.use('/api/product', product)
app.use('/api/checkout', stripe)





// mongodb Connection

const mongoose = require('mongoose');

// console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("data base Connected Successsfully...")
}).catch((err) => {
    console.log("You have some error in mongoose Connection" + err)
})



app.listen(port, () => {
    console.log(`server is running on ${port}`)
})
