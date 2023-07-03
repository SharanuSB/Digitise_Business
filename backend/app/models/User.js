const mongoose = require("mongoose")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        minlength: 5,
        maxlength: 26,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function (value) {
                return {
                    error: `${value} Provide a valid Email id`
                }
            }
        }
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 10,
        unique: [true, "This Number is already taken"],
        required: [true, "Phone is Required"],
        validate: {
            validator: function (value) {
                return validator.isNumeric(value)
            },
            message: function (value) {
                return {
                    error: "Phone should only contain Numbers"
                }
            }
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128
    },

    role: {
        type: String,
        default: "customer",
        enum: ["superAdmin", "shopOwner", "customer"]
    }

})

userSchema.pre("save", async function (next) {
    const usersCount = await User.collection.countDocuments()
    if(usersCount==0){
        this.role="superAdmin"
    }
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User