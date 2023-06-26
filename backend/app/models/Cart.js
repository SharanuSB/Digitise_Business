const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = ({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    cartItems: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number
        }
    }]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart