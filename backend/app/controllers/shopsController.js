const Shop = require("../models/Shop")

const shopsController = {}

shopsController.list = async (req, res) => {
    try {
        const id = req.user.id
        console.log()
        const role = req.user.role
        let shops
        if (role == "superAdmin") {
            shops = await Shop.find()
        } else if (role == "shopOwner") {
            shops = await Shop.findOne({ shopOwnerId: id })
            console.log(shops)
        }
        if (shops) {
            res.json(shops)
        } else {
            res.json({})
        }

    } catch (error) {
        res.json(error)
    }
}

shopsController.create = async (req, res) => {
    try {
        const body = req.body
        const id = req.user.id
        const shopObj = await Shop.create({ ...body, shopOwnerId: id })
        if (shopObj) {
            res.json(shopObj)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

shopsController.update = async (req, res) => {
    try {
        const body = req.body
        console.log(body)
        const shopId = req.params.id
        const id = req.user.id
        const shop = await Shop.findOneAndUpdate({_id:shopId, shopOwnerId:id}, {...body}, {new:true, runValidators:true})
        if(shop){
            res.json(shop)
        }else{
            res.json({})
        }

    } catch (error) {
        res.json(error)
    }
}

shopsController.destroy = async(req, res)=>{
    try {
        const id = req.params.id
        const ownerId = req.user.id
        const shop = await Shop.findOneAndDelete({_id:id, shopOwnerId:ownerId})
        if(shop){
            res.json(shop)
        }else{
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}




module.exports = shopsController