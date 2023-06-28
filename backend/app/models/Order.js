const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderNumber: {
        type: Number,
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
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    address: {
        type: String,
        required: true
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    status: {
        type: Boolean,
        default: false
    },
    Total: {
        type: Number,
        required: true
    }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order