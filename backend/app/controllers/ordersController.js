const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Razorpay = require("razorpay")
const crypto = require("crypto")

require("dotenv").config()

const ordersController = {}

const paymentInstance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET
})

ordersController.list = async (req, res) => {
    try {
        const customerId = req.user.id
        const order = await Order.find({ customerId: customerId }).populate("orderItems.productId").populate("orderItems.shopId")
        if (order.length!==0) {
            res.json(order)
        } else {
            res.json([])
        }
    } catch (error) {
        alert(error)
    }
}

ordersController.listByShop = async (req, res) => {
    try {
      const shopId = req.params.shopId
      const orders = await Order.find({ 'orderItems.shopId': shopId })
        .populate('customerId', 'name email') 
        .populate('orderItems.productId', 'name price')
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }

ordersController.getKey = async (req, res) => {
    try {
        const key = process.env.RAZORPAY_API_KEY
        res.json(key)
    } catch (error) {
        res.json(error)
    }
}

ordersController.create = async (req, res) => {
    try {
        const amount = req.body.amount
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
        }
        const order = await paymentInstance.orders.create(options)
        if(order){
            res.status(200).json({
                success: true, order
            })
        }
    } catch (error) {
        res.json(error)
    }
}

ordersController.paymentVerification = async (req, res) => {
    try {
        const {customerId, amount} = req.query

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

        const body = razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature =crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex")

        const isAuthentic = expectedSignature === razorpay_signature

        if(isAuthentic){
            const cart = await Cart.findOne({customerId: customerId})
            const cartItems = cart.cartItems

            const order = await Order.create({orderId:razorpay_order_id,paymentId:razorpay_payment_id,paymentSignature:razorpay_signature, customerId: customerId, orderItems:[...cartItems], Total:amount})

            if(order){
                await Cart.findByIdAndDelete(cart._id)
                res.redirect(
                    `http://localhost:3000/account?paymentId=${razorpay_payment_id}`
                )
            }else{
                res.status(400).json({
                    error:"Unable to Create the Order"
                })
            }

        }else{
            res.status(400).json({
                success:false
            })
        }

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
