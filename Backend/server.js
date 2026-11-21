const app = require("./src/app")
const connectToDB = require("./src/config/database")
require("dotenv").config()

// Connection of server to detabase established.
connectToDB()

app.listen(3000, () => {
    console.log("Server is running on port: 3000")
})