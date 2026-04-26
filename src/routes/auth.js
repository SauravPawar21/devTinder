const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signUp", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName,lastName,emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password,10);

    //creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId, 
      password: passwordHash,
    });
     await user.save();
  res.send("User Added successfully");
  } catch (err) {
    res.status(400).send("error while saving the user:" + err.message);
  }
});

authRouter.post("/login",async(req,res)=>{
  try{
    const { emailId, password } = req.body;

    const user = await User.findOne({emailId: emailId});

    if(!user){
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validtePassword(password);

    if(isPasswordValid){
      const token = await user.getJWT();
      // console.log(token);
      res.cookie("token",token,{expires: new Date(Date.now()+5 *360000)});
      res.send("Login successfully!!");
    }else{
    throw new Error("Invalid Credentials");
    }
  }
  catch(err){
    res.status(400).send("ERROR" + err.message);
  }
})

authRouter.post("/logout", async (req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    })
    res.send("Logout successfully!"); 
})

module.exports=authRouter;
