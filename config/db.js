const mongoose = require("mongoose")
require("dotenv").config()
"heloooooooooo"
const connection = mongoose.connect(process.env.mongoUrl)

module.exports = connection