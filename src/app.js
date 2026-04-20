const express = require("express");

//creating an new express application
const app = express();

//This will only handles GET call to /user
app.get("/user/:userId/:name",(req,res)=>{
    console.log(req.query);
    console.log(req.params);
    res.send({firstname:"saurav",lastname: "pawar"});
})

//use :- will match all the HTTP methods api call to /test
app.use("/test",(req,res)=>{
    res.send("test page!");
})


app.listen(3000);// listen to server on PORT: 3000