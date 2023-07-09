const Shop = require("../models/Shop")

const shopsController = {}

shopsController.listAll = async (req, res) => {
    try {
        const shops = await Shop.find()
        if (shops) {
            res.json(shops)
        } else {
            res.json([])
        }
    } catch (error) {
        res.json(error)
    }
}

shopsController.show = async (req, res) => {
    try {
        const ownerId = req.user.id
        const shop = await Shop.findOne({ shopOwnerId: ownerId })
        if (shop) {
            res.json(shop)
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
        const shopObj = await Shop.create({ ...body, shopOwnerId: id, website: `http://${body.name}.com` })
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
        const shopId = req.params.id
        const id = req.user.id
        const shop = await Shop.findOneAndUpdate({ _id: shopId, shopOwnerId: id }, { ...body }, { new: true, runValidators: true })
        if (shop) {
            res.json(shop)
        } else {
            res.json({})
        }

    } catch (error) {
        res.json(error)
    }
}

shopsController.destroy = async (req, res) => {
    try {
        const id = req.params.id
        const shop = await Shop.findOneAndDelete({ _id: id })
        if (shop) {
            res.json(shop)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

shopsController.verify = async (req, res) => {
    try {
        const id = req.params.id
        const shop = await Shop.findOneAndUpdate({ _id: id }, { isVerified: true }, { new: true, runValidators: true })
        if (shop) {
            res.json(shop)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

shopsController.listBySearch = async (req, res) => {
    try {
        const text = req.query.text
        if (text.length !== 0) {
            const shops = await Shop.find({ name: { $regex: text, $options: "i" } })
            res.json(shops)
        } else {
            res.json([])
        }
    } catch (error) {
        res.json(error)
    }
}




module.exports = shopsController