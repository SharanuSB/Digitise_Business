const Cart = require('../models/Cart')
const Product = require("../models/Product")

const cartsController = {}


cartsController.show = async (req, res) => {
    try {
        const customerId = req.user.id
        const cart = await Cart.find({ customerId: customerId })
        if (cart) {
            res.json(cart)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}


cartsController.addProducts = async (req, res) => {
    try {
        const productId = req.params.productId
        const product = await Product.findOne({ _id: productId })

        const customerId = req.user.id
        const cart = await Cart.findOne({ customerId: customerId })

        

        

    } catch (error) {
        res.json(error)
    }
}

module.exports = cartsController