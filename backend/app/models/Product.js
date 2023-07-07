const mongoose = require("mongoose")
const validator = require("validator")
const nameFormat = /^[a-zA-Z ]*$/
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        validate: {
            validator: function (value) {
                return nameFormat.test(value)
            },
            message: function (value) {
                return {
                    error: `${value} is not a valid product name`
                }
            }
        } 
    },

    price:{
        type:Number,
        required:true,
        min:1,
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