const Product = require('../models/product')



//  Product Add here 
exports.product = async (req, res) => {
    console.log(req.body)
    const { title, desc, img, category, size, color, price } = req.body;

    try {
        const product = new Product({
            title: title,
            desc: desc,
            img: img,
            category: category,
            size: size,
            color: color,
            price: price
        })
        const createProduct = await product.save()
        res.status(201).json(createProduct)

    } catch (err) {
        res.status(500).json(err)
    }

}
// Product Update Only Admin

exports.productUpdate = async (req, res) => {
    const id = req.params.id;
    try {
        const updateProduct = await Product.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updateProduct)
    } catch (err) {
        res.status(500).json(err)
    }



}

//  Find  Product By id 


exports.FindProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const productis = await Product.findById(id)
        return res.status(200).json(productis)

    } catch (err) {
        res.status(500).json(err)
    }



}

//  Find All Product 

exports.GetAllproduct = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        let product;
        if (qNew) {
            product = await Product.find().sort({ _id: -1 }).limit(5);
        }
        else if (qCategory) {
            product = await Product.find({
                category: {
                    $in: [qCategory],
                }
            })
        }
        else {
            product = await Product.find()
        }

        // return res.status(200).json(product)
        return res.status(200).json({ message: "Hello i got all products" })



    } catch (err) {
        res.status(500).json(err)
    }



}