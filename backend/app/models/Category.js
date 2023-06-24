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
    imageUrl: {
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
        unique: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category