const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewsSchema = new Schema({
    title:{
        type:String,
        required:true
    },

    body:{
        type:String,
    },

    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },

    customerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },

    shopId:{
        type:Schema.Types.ObjectId,
        ref:"Shop"
    }
})

const Review = mongoose.model("Review", reviewsSchema)

module.exports  = Review