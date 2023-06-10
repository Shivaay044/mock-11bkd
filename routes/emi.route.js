const express = require("express");
const emiRouter = express.Router()


emiRouter.post("/",async(req,res)=>{
    let {loan_amt,annual_ir,tenure_m} = req.body
    try {
        const rate = (annual_ir/12/100)
        const emi = loan_amt * rate * (1 + rate)*tenure_m / ((1+rate)*tenure_m - 1)
         res.send(emi)
    } catch (error) {
        res.sendStatus(400).send(error.message)
    }
})



module.exports = emiRouter