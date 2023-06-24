
const authorizeUser = (req, res, next)=>{
    if(req.permittedRoles.includes(req.user.role)){
        next()
    }else{
        res.json({
            error:"Not Authorised"
        })
    }
}

module.exports = authorizeUser