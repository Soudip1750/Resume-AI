const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 * @route POST /api/auth/register
 * @description Regiter a new user with username, email and password in body.
 * @access Public
 */
async function registerUserController(req, res) {
    const {username, email, password} = req.body

    // Checking if all the info is filled by the user.
    if(!username) {
        return res.status(400).json({
            message: "Please provide username."
        })
    } else if(!email) {
        return res.status(400).json({
            message: "Please provide email."
        })
    } else if(!password) {
        return res.status(400).json({
            message: "Please provide Password."
        })
    }

    // Checking if user with same username or email exists or not.
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username}, {email}]
    })

    if(isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email address or username."
        })
    }

    // Creation of new user.
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await userModel.create({
        username,
        password: hashedPassword,
        email,
    })

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "1d"}
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User created successfully.",
        user: {
            username: user.username,
            id: user._id,
            email: user.email
        }
    })
}

async function loginUserController(req, res) {
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    // Checking if any account exists with that email address.
    if(!user) {
        return res.status(400).json({
            message: "Invalid email, try using the right one."
        })
    }

    // Checking if the user is entering the right password.
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Incorrect password."
        })
    }

    // In case email and password both valid.
    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "1d"}
    )

    res.cookie("token", token)
    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            username: user.username,
            id: user._id,
            email: user.email
        }
    })
}

async function logoutUserController(req, res) {
    const token  = req.cookies.token

    if(token) {
        await tokenBlacklistModel.create({token});
    }
    res.clearCookie("token")
    res.status(200).json({
        message: "User logged out successfully."
    })
}

/**
 * @route GET /api/auth/get-me
 * @description Gives the current logged in user details.
 * @access Private
 */
async function getmeUserController(req, res) {
    const user = await userModel.findById(req.user.id)

    if(!user){
        res.status(400).json({
            message: "User does not exists in databse."
        })
    }
    res.status(200).json({
        message: "User found successfully.",
        user: {
            username: user.username,
            id: user._id,
            email: user.email
        }
    })
}
module.exports = {
    registerUserController,
    logoutUserController,
    loginUserController,
    getmeUserController
}