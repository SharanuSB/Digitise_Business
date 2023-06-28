const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Shop = require('../models/Shop')

const ordersController = {}

ordersController.list = async (req, res) => {
    try {
        const userId = req.user.id
        const shopObj = await Shop.findOne({ shopOwnerId: userId })

        if (!shopObj) {
            res.json({ message: 'Shop not found' })
        }

        const shopId = shopObj._id

        const cartItems = await Cart.findOne({ customerId: userId })
        if (cartItems) {
            res.json(cartItems)
        } else {
            res.json({ message: 'no items present to order' })
        }
    } catch (error) {
        res.json(error)
    }
}

ordersController.create = async (req, res) => {
    try {
        const customerId = req.user.id
        const cart = await Cart.findOne({ customerId: customerId })

        if (cart) {
            const orderNumber = Math.round(Math.random() * 1000)
            const orderItems = cart.cartItems
           
            const orderTotal = orderItems.reduce((pv, cv) => pv + cv.price, 0)
            // console.log(orderTotal)

            const body = req.body
            const orderObj = new Order({ orderNumber: orderNumber, customerId: customerId, ...body, Total: orderTotal, orderItems: orderItems})
            const order = await orderObj.save()
            if(order) {
                res.json(order)
    
                const deleteCart = await Cart.findOneAndDelete({customerId: customerId})
                if(deleteCart) {
                    res.json({message: 'cart is empty'})
                } else {
                    res.json({message: 'Error occured'})
                }
            }
        } else {
            res.json([])
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = ordersController