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

    image:[
        {
            type:String
        },
    ],

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
    },

    reviews:[
        {
            star:{
                type:Number,
                min:1,
                max:5,
                required:true
            },
            body:{
                type:String,
                required:true,
                maxlength:200,
                minlength:4
            },
            customerId:{
                type:Schema.Types.ObjectId,
                ref:"User",
            }
        }
    ]
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product