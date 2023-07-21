const Product = require("../models/Product")
const Shop = require("../models/Shop")
const multer = require("multer")
const removebg = require("remove.bg")

const productsController = {}

productsController.listAll = async (req, res) => {
    try {
        const role = req.user.role
        let products
        if (role === "customer") {
            const shopName = req.params.id
            const shop = await Shop.findOne({ name: { $regex: shopName, $options: "i" } })
            products = await Product.find({ shopId: shop._id })
        } else if (role === "shopOwner") {
            const shopId = req.params.id
            products = await Product.find({ shopId: shopId })
        }
        if (products) {
            res.json(products)
        } else {
            res.json([])
        }
    } catch (error) {
        res.json(error)
    }
}

productsController.create = async (req, res) => {
    try {
        const body = req.body
        const shopId = req.params.shopId
        const categoryId = req.query.categoryId
        const product = await Product.create({ ...body, shopId: shopId, categoryId: categoryId })

        if (product) {
            res.json(product)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

productsController.update = async (req, res) => {
    try {
        const body = req.body
        const productId = req.query.id
        const product = await Product.findOneAndUpdate({ _id: productId }, body, { new: true, runValidators: true })
        if (product) {
            res.json(product)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

productsController.destroy = async (req, res) => {
    try {
        const id = req.query.id
        const product = await Product.findByIdAndDelete(id)
        if (product) {
            res.json(product)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}


productsController.addReviews = async (req, res) => {
    try {
        const userId = req.user.id
        const body = req.body
        const productId = req.params.id

        const isReview = await Product.findOne({ _id: productId, "reviews.customerId": userId })
        let review
        if (!isReview) {
            review = await Product.findByIdAndUpdate({ _id: productId }, { $push: { reviews: { ...body, customerId: userId } } },
                { new: true, runValidators: true })
            if (review) {
                res.json(review)
            } else {
                res.json({})
            }
        } else {
            res.json(
                { error: "You can review the product once" }
            )
        }

    } catch (error) {
        res.json(error)
    }
}

productsController.addImage = async (req, res) => {
    try {
        const productId = req.params.id
        const image = req.file.path
        const product = await Product.findByIdAndUpdate(productId, { $push: { image: image } }, { new: true, runValidators: true })
        if (product) {
            res.json(product)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}


module.exports = productsController