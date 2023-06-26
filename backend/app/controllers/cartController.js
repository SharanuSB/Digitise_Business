const Cart = require('../models/Cart')

const cartController = {}

cartController.list = async(req, res) => {
    try {
        const userId = req.user.id
        const cart = await Cart.find({userId:userId})
        if(cart){
            res.json(cart)
        }else{
            res.json([])
        }
    } catch (error) {
        res.json(error)
    }
}

cartController.create = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = cartController