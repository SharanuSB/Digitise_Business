const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Product = require('../models/Product')
const Shop = require('../models/Shop')

const ordersController = {}

ordersController.list = async (req, res) => {
    try {
        const customerId = req.user.id
        const order = await Order.findOne({customerId: customerId})
        if(order) {
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
        const cart = await Cart.findOne({customerId: customerId})

        const shopId = cart.shopId
        
        const cartItems = cart.cartItems

        const orderNumber = Math.round(Math.random() * 1000)

        const itemsWithPrice = await Promise.all(cartItems.map(async (item) => {
            const product = await Product.findById(item.productId)
            if (!product) {
                throw new Error(`Product not found for ID: ${item.productId}`)
            }
            const itemWithPrice = {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            }
            return itemWithPrice
        }))

        const totalPrice = itemsWithPrice.reduce((total, item) => total + (item.price * item.quantity), 0)
        console.log(totalPrice)

        const body = req.body
        const orderObj = new Order({orderNumber: orderNumber, customerId: customerId, orderItems: itemsWithPrice, ...body, Total: totalPrice, shopId: shopId})
        const order = await orderObj.save()
        await Cart.findByIdAndDelete(cart._id)
        res.json(order)
    } catch (error) {
        res.json(error)
    }
}

ordersController.delete = async(req, res) => {
    try {
        const orderId = req.params.id
        const deleteOrder = await Order.findByIdAndDelete(orderId)
        res.json(deleteOrder)
    } catch (error) {
        res.json(error)
    }
}

module.exports = ordersController