const Shop = require("../models/Shop")

const authorizeOwner = async(req, res, next)=>{
    const userId = req.user.id
    const shopId = req.params.id
    const shopObj = await Shop.findOne({shopOwnerId:userId})
    if(shopObj){
        if(shopObj._id==shopId){
            next()
        }else{
            res.json({
                error:"You are Not Authorised"
            })
        }
    }else{
        res.json({
            error:"Its not ur Shop"
        })
    }
   
}

module.exports = authorizeOwner