
const Product = require("../models/Product")

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
        const product = await Product.create({...body, shopId:shopId, categoryId:categoryId})
     
        if(product){
           res.json(product)
        }else{
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

productsController.update = async(req, res)=>{
    try {
        const body = req.body
        const productId = req.query.id
        const product = await Product.findOneAndUpdate({_id:productId}, body, {new:true, runValidators:true})
        if(product){
            res.json(product)
        }else{
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

productsController.destroy = async(req, res)=>{
    try {
        const id = req.query.id
        const product = await Product.findByIdAndDelete(id)
        if(product){
            res.json(product)
        }else{
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}


module.exports = productsController