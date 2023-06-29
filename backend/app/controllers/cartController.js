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

        const shopId = req.query.shopId

        const customerId = req.user.id
        const cart = await Cart.findOne({ customerId: customerId })

        const cartItemBody = {
            productId: productId, quantity: 1, price: product.price, shopId: shopId
        }

        let cartItem

        if (cart) {
            const isProduct = cart.cartItems.find(ele => ele.productId.valueOf() === productId)

            if (isProduct) {
                cartItem = await Cart.findOneAndUpdate({ customerId: customerId }, {
                    cartItems: [...cart.cartItems.map(ele => {
                        if (ele.productId.valueOf() === productId) {
                            return { ...ele,...{ quantity: ele.quantity++, price:ele.price += product.price} }
                        } else {
                            return { ...ele }
                        }
                    })]
                }, { new: true, runValidators: true })
            } else {
                cartItem = await Cart.findOneAndUpdate({ customerId: customerId }, { $push: { cartItems: cartItemBody } }, { new: true, runValidators: true })
            }
        } else {
            cartItem = await Cart.create({ customerId: customerId, shopId: shopId, cartItems: [{ ...cartItemBody }] })
        }

        res.json(cartItem)

    } catch (error) {
        res.json(error)
    }
}

module.exports = cartsController
