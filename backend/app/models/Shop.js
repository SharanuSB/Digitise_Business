const mongoose = require("mongoose")
const validator = require("validator")

const Schema = mongoose.Schema

const shopSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30,
        required:true,
        validate: {
            validator: function (value) {
                return validator.isAlphanumeric(value)
            },
            message: function (value) {
                return {
                    error: `${value} is not a valid shop name`
                }
            }
        }
    },

    address: {
        type: String,
        required: true,
    },

    contactNumber: {
        type: String,
        minlength: 10,
        maxlength: 10,
        required: [true, "Contact Number is Required"],
        unique:true
    },

    website:{
        type:String,
        validate:{
            validator:function(value){
                return validator.isURL(value)
            },
            message:function(value){
                return {
                    error:`${value} is not a valid url`
                }
            }   
        },
        unique:true
    },

    socialLinks:{
        instagram:{
            type:String,
            unique:true
        },
        youtube:{
            type:String,
            unique:true
        },
        facebook:{
            type:String,
            unique:true
        }
    },
    
    isVerified:{
        type:Boolean,
        default:false
    },
    
    shopOwnerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

})

const Shop = mongoose.model("Shop", shopSchema)

module.exports = Shop