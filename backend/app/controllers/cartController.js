const Cart = require("../models/Cart")

const cartsController = {}

cartsController.show = async (req, res) => {
    try {
        const customerId = req.user.id
        const cart = await Cart.findOne({ customerId: customerId }).populate("cartItems.productId")
        if (cart) {
            res.json(cart)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
};


cartsController.addProducts = async (req, res) => {
    try {
        const productId = req.params.productId
        const shopId = req.query.shopId
        const customerId = req.user.id

        const cart = await Cart.findOne({ customerId: customerId })

        if (cart) {
            const isProduct = cart.cartItems.find(ele => ele.productId.valueOf() === productId)
            if (isProduct) {
                await Cart.updateOne(
                    { _id: cart._id, "cartItems.productId": productId },
                    { $inc: { "cartItems.$.quantity": 1 } },
                    { new: true, runValidators: true }
                )
            } else {
                await Cart.findOneAndUpdate(
                    { customerId: customerId },
                    { $push: { cartItems: { productId: productId, quantity: +1, shopId: shopId } } },
                    { new: true, runValidators: true }
                )
            }
        } else {
            await Cart.create({
                customerId: customerId,
                cartItems: [{ productId: productId, quantity: 1, shopId: shopId }],
            })
        }

        const updatedCart = await Cart.findOne({ customerId: customerId }).populate("cartItems.productId")
        res.json(updatedCart)

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}



cartsController.decreaseQuantity = async (req, res) => {
    try {
        const productId = req.params.productId
        const customerId = req.user.id

        const cart = await Cart.findOneAndUpdate({ customerId:customerId, "cartItems.productId": productId }, { $inc: { "cartItems.$.quantity": -1 } }, { new: true, runValidators: true })

        const updatedCart = await Cart.findOne({ customerId: customerId }).populate("cartItems.productId")
        res.json(updatedCart)

    } catch (error) {
        res.json(error)
    }
}

cartsController.removeProduct = async (req, res) => {
    try {
        const productId = req.params.productId
        const customerId = req.user.id

        const cart = await Cart.findOneAndUpdate({ customerId: customerId, "cartItems.productId": productId }, { $pull: { cartItems: { productId: productId } } }, { new: true, runValidators: true })

        const updatedCart = await Cart.findOne({ customerId: customerId }).populate("cartItems.productId")
        res.json(updatedCart)

    } catch (error) {
        res.json(error)
    }
}

module.exports = cartsController
