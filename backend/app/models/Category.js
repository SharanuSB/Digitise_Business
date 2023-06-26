const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require("validator")

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30,
        validate: {
            validator: function (value) {
                return validator.isAlpha(value)
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

const Category = mongoose.model('Category', categorySchema)

module.exports = Category