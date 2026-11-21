// We need to require express for createing auth routes.
const {Router} = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")


const authRouter = Router()
// Here we will not write the logic. Logic will be wriiten in controller.
/**
 * @route POST /api/auth/register
 * @description Register a new user.
 * @access Public.
 */
authRouter.post("/register", authController.registerUserController)
/**
 * @route POST /api/auth/login
 * @description Login for registered user.
 * @access Public.
 */
authRouter.post("/login", authController.loginUserController)
/**
 * @route GET /api/auth/logout
 * @description Clear the token from user cookie and add the token in blacklist.
 * @access Public.
 */
authRouter.get("/logout", authController.logoutUserController)
/**
 * @route GET /api/auth/get-me
 * @description Get current logged in uder details.
 * @access private.
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getmeUserController)

module.exports = authRouter