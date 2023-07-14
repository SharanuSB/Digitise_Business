const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cartItems: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 0
        },
        shopId: {
            type: Schema.Types.ObjectId,
            ref: 'Shop'
        }
    }]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart