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