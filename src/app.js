const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieparser());

app.post("/signUp", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    const { firstName,lastName,emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash);

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

app.get("/profile",async (req,res)=>{
  try{const cookies= req.cookies;
  //here we are getting an cookies as undefined for that we have to install the package know as cookie parser.
  const {token} = cookies;
  //validate my token
  if(!token){
    throw new Error("Invalid Token");
  }
  const decodedMessage = await jwt.verify(token,"DEV@Tinder@91");

  const {_id} = decodedMessage;
  // console.log("Loged in userId:"+ _id);
  // console.log(cookies); 
  const user = await User.findById(_id);
  if(!user){
    throw new Error("User doesn't exits")
  }
  res.send(user); 
}
catch(err){
    res.status(400).send("ERROR" + err.message);
  }
})

//login api
app.post("/login",async(req,res)=>{
  try{
    const { emailId, password } = req.body;

    const user = await User.findOne({emailId: emailId});

    if(!user){
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
      //create an JWT token
      const token = await jwt.sign({_id: user._id}, "DEV@Tinder@91");
      // console.log(token);
      //add the token to cookie and send the response back
      res.cookie("token",token);
      res.send("Login successfully!!");
    }else{
    throw new Error("Invalid Credentials");
    }
  }
  catch(err){
    res.status(400).send("ERROR" + err.message);
  }
})

//get user by email
app.get("/user",async (req,res)=>{
  const userEmail = req.body.emailId;
  console.log(userEmail,"user email is present");
  try{
    const user = await User.findOne({emailId: userEmail})
    res.send(user);
  }
  catch(err){
    res.status(400).send("something went worng")
  }
})

//Feed API - GET/feed - get all the users from database
app.get("/feed",async (req,res)=>{
  try {
    const users = await User.find({});//it will fetch the all users data from the database
    res.send(users);
  } catch (error) {
    res.status(400).send("something went worng");
  }
})

//delete an user by id
app.delete("/delete",async (req,res)=>{
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User is deleted successfully!!!")
  } catch (error) {
    res.status(400).send("something went worng");
  }
})

//update the user data
app.patch("/user",async (req,res)=>{
  const userId=req.body.userId;
  const data = req.body;
  try {
    const ALLOUD_UPDATE=[
      "userId",
      "age",
      "skills",
      "about",
      "photoUrl",
      "gender"
    ];
    const isUpdateAllowed= Object.keys(data).every((k)=>{
      ALLOUD_UPDATE.includes(k);
    })
    
    if(!isUpdateAllowed){
      throw new Error("Update now allwoed");
    }
    if(data?.skills.length >10){
      throw new Error("skills can not be more that 10")
    }
    const userUpdated = await User.findByIdAndUpdate({_id: userId},data,{returnDocument: 'after',runValidators: true,});
    console.log(userUpdated);
    
    res.send("updated user data!!")
  } catch (error) {
    res.status(400).send("something went worng!!!")
  }
})
connectDB()
  .then(() => {
    console.log("Database connection Established...");
    app.listen(3000, () => {
      console.log("Listing to this PORT 3000");
    });
  })
  .catch(() => {
    console.log("Database cannot be connected!");
  });
