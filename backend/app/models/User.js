const mongoose = require("mongoose")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        minlength:5,
        maxlength:26,
        required:true,
        validate:{
            validator:function(value){
                return validator.isAlpha(value)
            },
            message:function(value){
                return {
                    error:"Username Should only contain the Alphabets"
                }
            }        
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(value){
                return{
                    error:`${value} Provide a valid Email id`
                }
            }
        }
    },
    phone:{
        type:String,
        minlength:10,
        maxlength:10,
        unique:[true, "This Number is already taken"],
        required:[true, "Phone is Required"],
        validate:{
            validator:function(value){
                return validator.isNumeric(value)
            },  
            message:function(value){
                return {
                    error:"Phone should only contain Numbers"
                }
            }
        }
    },
    
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:128
    },

    role:{
        type:String,
        enum:["superAdmin", "shopOwner", "customer"]
    }

})

const User = mongoose.model("User", userSchema)

module.exports = User