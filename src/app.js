const express = require("express");

//creating an new express application
const app = express();

const { adminAuth,userAuth } = require("./middlewares/auth")

//Handle Auth Middleware for all the GET,POST... requests
app.use("/admin",adminAuth);

app.get("/user",userAuth,(req,res)=>{
    res.send("user data sent")
})

app.get("/admin/getAllData",(req,res)=>{
    //Logic of checking that request is autorized or not
   res.send("Gets all the Data");
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("user is delted");
})

//use :- will match all the HTTP methods api call to /test
app.use("/test",(req,res)=>{
    res.send("test page!");
})


app.listen(3000);// listen to server on PORT: 3000