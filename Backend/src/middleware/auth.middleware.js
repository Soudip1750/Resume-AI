const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req, res, next) {
    // First token is accessed.
    const token = req.cookies.token

    // If there is no token then no token provided messsage is shown.
    if(!token) {
        res.status(401).json({
            message: "Token is not provided."
        })
    }

    // If token is achived, we have to check if the token is blacklisted or not.
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({token})

    if(isTokenBlacklisted) {
        res.status(400).json({
            message: "Token is already blacklisted."
        })
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        // If the token succesfully decoded.
        req.user = decoded

        next()

    } catch(err) {
        // If the token is not valid or expired.
        res.status(401).json({
            message: "Invalid token information."
        })
    }
}

module.exports = {authUser}