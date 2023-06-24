const mongoose = require("mongoose")

const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        unique:[true, "Already Taken"]
    },

    price:{
        type:Number,
        required:true,
        min:1
    },

    image:{
        type:String,
        validate: {
            validator: function (value) {
                return validator.isURL(value)
            },
            message: function (value) {
                return {
                    error: `${value} is not a valid url`
                }
            }
        },
        unique: true
    },

    Description:{
        type:String
    },
    
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },

    shopId:{
        type:Schema.Types.ObjectId,
        ref:"Shop"
    },

    isAvailable:{
        type:Boolean,
        default:true
    }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product