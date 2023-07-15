const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    orderItems: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        },
        shopId: {
            type: Schema.Types.ObjectId,
            ref: 'Shop'
        }
    }],
    status: {
        type: Boolean,
        default: false
    },
    paymentId: {
        type: String,
        required: true
    },
    paymentSignature: {
        type: String,
        required: true
    },
    Total: {
        type: Number,
        required: true
    },
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order