const express = require("express");

//creating an new express application
const app = express();


app.get(
    "/user",
    (req,res,next)=>{
    console.log("1 Route ");
    next();
},
    (req,res,next)=>{
    console.log("2 Route ");
    // res.send("2 Response");
    next()
},
    (req,res,next)=>{
    console.log("3 Route ");
    // res.send("3 Response");
    next()
},
    (req,res,next)=>{
    console.log("4 Route ");
    res.send("4 Response");
}
)

//use :- will match all the HTTP methods api call to /test
app.use("/test",(req,res)=>{
    res.send("test page!");
})


app.listen(3000);// listen to server on PORT: 3000