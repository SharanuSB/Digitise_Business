const jwt = require("jsonwebtoken")
require("dotenv").config()

const userAuthentication = (req, res, next) => {
    const token = req.header("Auth").split(' ')[1]
    if (token) {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenData) {
            req.user = {
                id:tokenData.id,
                role:tokenData.role
            }
            next()
        } else {
            res.json({
                error: "Invalid Signature"
            })
        }
    } else {
        res.json({
            error: "jwt token is not provided"
        })
    }

}
module.exports = userAuthentication