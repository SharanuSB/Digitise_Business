const Category = require('../models/Category')
const Shop = require('../models/Shop')

const categoryController = {}

categoryController.create = async(req, res) => {
    try {
        const id = req.user.id
        const body = req.body
        const shopObj = await Shop.findOne({shopId: id})
        console.log(shopObj)
        const category = await Category.create({shopId: shopObj._id, ...body})
        if(category) {
            res.json(category)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = categoryController