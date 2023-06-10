const mongoose = require("mongoose")

const emiSchema = mongoose.Schema({
    "loan_amt":Number,
    "annual_ir":Number,
    "tenure_m":Number
},{
    versionKey:false
})


const emiModel = mongoose.model("emi",emiSchema)

module.exports = emiModel