const mongoose = require("mongoose")

// Creteaing the schema for blacklisting.
const blacklistinTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required to be added into blacklist."]
    }
}, {
    timestamps: true,
})

const tokenBlacklistModel = mongoose.model("blacklistTokens", blacklistinTokenSchema)

module.exports = tokenBlacklistModel