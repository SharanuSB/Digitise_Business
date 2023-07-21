const Category = require('../models/Category')
const Shop = require('../models/Shop')

const categoryController = {}

categoryController.create = async(req, res) => {
    try {
        const shopId = req.params.shopId
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

categoryController.listAll = async(req, res)=>{
    try {
        const shopId = req.params.id
        const categories = await Category.find({shopId:shopId})
        if(categories){
            res.json(categories)
        }else{
            res.json([])
        }
    } catch (error) {
        res.json(error)
    }
}

categoryController.update = async(req, res)=>{
    try {
        const categoryId = req.query.id
        const body = req.body
        const category = await Category.findByIdAndUpdate(categoryId, body, {new:true, runValidators:true})
        if(category){
            res.json(category)
        }else{
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

categoryController.destroy = async(req, res)=>{
    try {
        const categoryId = req.query.id
        const category = await Category.findByIdAndDelete(categoryId)
        if(category){
            res.json(category)
        }else{
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = categoryController