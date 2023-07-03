const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Product = require('../models/Product')

const ordersController = {}

ordersController.list = async (req, res) => {
    try {
        const customerId = req.user.id
        const order = await Order.findOne({ customerId: customerId })
        if (order) {
            res.json(order)
        } else {
            res.json([])
        }
    } catch (error) {
        alert(error)
    }
}

ordersController.create = async (req, res) => {
    try {
        const customerId = req.user.id
        const shopId = cart.shopId

        const cartItems = cart.cartItems

        const orderNumber = Math.round(Math.random() * 100000000)

        const itemsWithPrice = await Promise.all(cartItems.map(async (item) => {
            const product = await Product.findById(item.productId)
            const WithPrice = {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            }
            return WithPrice
        }))

        const totalPrice = itemsWithPrice.reduce((total, item) => total + (item.price * item.quantity), 0)

        const body = req.body

    } catch (error) {
        res.json(error)
    }
}

ordersController.delete = async (req, res) => {
    try {
        const orderId = req.params.id
        const deleteOrder = await Order.findByIdAndDelete(orderId)
        res.json(deleteOrder)
    } catch (error) {
        res.json(error)
    }
}

module.exports = ordersController