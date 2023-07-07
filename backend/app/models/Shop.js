const mongoose = require("mongoose")
const validator = require("validator")
const nameFormat = /^[a-zA-Z ]*$/

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
                return nameFormat.test(value)
            },
            message: function (value) {
                return {
                    error: `${value} is not a valid Shop name`
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
        validate:{
            validator:function(value){
                return validator.isNumeric(value)
            },
            message:function(value){
                return {
                    error:`Contact Number should contain only Numbers`
                }
            }
        },
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
    },

    socialLinks:{
        instagram:{
            type:String,
            
        },
        youtube:{
            type:String,
            
        },
        facebook:{
            type:String,
            
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