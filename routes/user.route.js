const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.model");
const { model } = require("mongoose");
const jwt = require("jsonwebtoken");
const { setLocalSt, getLocalSt, clearLocalSt } = require("../utils/localStorage");
require("dotenv").config();
const userRouter = express();

let token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDg0MjM4NmU5MDQwMjllYmUwYzA4NjYiLCJpYXQiOjE2ODYzODMwMDh9.n8ZmtyIfXLlKud_ajzy51RYY0b1nRfDj57nLXamBwew"




userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const newUser = new userModel({ name, email, password: hash });
      await newUser.save();
      res.status(200).send("user registered sucessfully");
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});






userRouter.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    console.log(user)
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        
        if(result){
            res
              .status(200)
              .send({
                msg: "login success",
                token: jwt.sign({ userId: user._id }, process.env.secretKey),
              })
        }else{
            res.status(400).send("login failed");
        }
      });
    } else {
      res.status(400).send("login failed");
    }
  } catch (error) {
    res.status(400).send(error.messsage);
  }
});


userRouter.get("/profile",async(req,res)=>{
 try {
   let token = req?.headers?.authorization?.split(" ")[0]
   let {userId} = jwt.verify(token,process.env.secretKey)
   const {email,name} = await userModel.findOne({_id:userId})
   res.status(200).send({email,name})
 } catch (error) {
    res.send(error)
 }
})


userRouter.get("/logout",async(req,res)=>{
  try {
    let {userId} = jwt.verify(getLocalSt("token"),process.env.secretKey)
    const {email,name} = await userModel.findOne({_id:userId})
    clearLocalSt()
    res.status(200).send("logout success")
  } catch (error) {
     res.send(error)
  }
 })
 
 






module.exports = userRouter;
