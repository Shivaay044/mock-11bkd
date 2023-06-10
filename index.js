const express = require("express")
const connection = require("./config/db")
const userRouter = require("./routes/user.route")
const emiRouter = require("./routes/emi.route")
const cors = require("cors")
const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())


app.get("/",async(req,res)=>{
    res.send("<h1>Hello World</h1>")
})


app.use("/user",userRouter)
app.use("/emi",emiRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running at ${process.env.PORT}`)
})