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
        const shopId = req.query.shopId
        const customerId = req.user.id

        const cart = await Cart.findOne({ customerId: customerId })

        let cartItem
        if (cart) {
            const isProduct = cart.cartItems.find(ele => ele.productId.valueOf() === productId)
            if (isProduct) {

                cartItem = await Cart.updateOne({ _id: cart._id, "cartItems.productId": productId }, { $inc: { "cartItems.$.quantity": 1 } }, { new: true, runValidators: true }).populate('customerId')

            } else {
                cartItem = await Cart.findOneAndUpdate({ customerId: customerId }, { $push: { cartItems: { productId: productId, quantity: +1 } } }, { new: true, runValidators: true })
            }
        } else {
            cartItem = await Cart.create({ customerId: customerId, shopId: shopId, cartItems: [{ productId: productId, quantity: 1 }] })
        }

        res.json(cartItem)

    } catch (error) {
        res.json(error)
    }
}

cartsController.removeProduct = async (req, res) => {
    try {
        const productId = req.params.productId
        const customerId = req.user.id



    } catch (error) {
        res.json(error)
    }
}

module.exports = cartsController
