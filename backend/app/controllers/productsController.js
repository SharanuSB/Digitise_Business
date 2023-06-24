const Product = require("../models/Product")
const Shop = require("../models/Shop")

const productsController = {}

productsController.listAll = async(req, res)=>{
    try {
        const shopId = req.params.id
        const products = await Product.find({shopId:shopId})
        if(products){
            res.json(products)
        }else{
            res.json([])
        }
    } catch (error) {
        res.json(error)
    }
}

productsController.create = async(req, res)=>{
    try {
        const body = req.body
        const shopId = req.params.id
        const categoryId = req.query.categoryId
        const shop = await Product.create({...body, shopId:shopId, categoryId:categoryId})
        if(shop){
            res.json(shop)
        }else{
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}


module.exports = productsController