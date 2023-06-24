const Category = require('../models/Category')
const Shop = require('../models/Shop')

const categoryController = {}

categoryController.create = async(req, res) => {
    try {
        const shopId = req.params.id
        const body = req.body
        const category = await Category.create({shopId:shopId, ...body})
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