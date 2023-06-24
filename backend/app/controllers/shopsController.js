const Shop = require("../models/Shop")

const shopsController = {}

shopsController.list = async(req, res)=>{
    try {
        const id = req.user.id
        console.log()
        const role = req.user.role
        let shops
        if(role=="superAdmin"){
            shops = await Shop.find()
        }else if(role=="shopOwner"){
            shops = await Shop.findOne({shopOwnerId:id})
            console.log(shops)
        }
        if(shops){
            res.json(shops)
        }else{
            res.json({})
        }
        
    } catch (error) {
        res.json(error)
    }
}

shopsController.create = async(req, res)=>{
    try {
        const body = req.body
        const id = req.user.id
        const shopObj = await Shop.create({...body, shopOwnerId:id})
        if(shopObj){
            res.json(shopObj)
        }else{
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}




module.exports = shopsController