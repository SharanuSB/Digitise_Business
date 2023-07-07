const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require("validator")
const nameFormat = /^[a-zA-Z ]*$/


const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        index:true,
        validate: {
            validator: function (value) {
                return nameFormat.test(value)
            },
            message: function (value) {
                return {
                    error: `${value} is not a valid category name`
                }
            }
        }
    },
    image: {
        type: String,
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


    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    }
})

categorySchema.index({name:1})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category