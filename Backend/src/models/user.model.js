const mongoose = require("mongoose")


const userShema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already used."],
        required: true,
    },

    email: {
        type: String,
        unique: [true, "Account already exists with this email adress"],
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
})

// In mongoDB different info is stored in different models.
const userModel = mongoose.model("Users", userShema)

// In this we are exporting the whole model not the schema.
module.exports = userModel