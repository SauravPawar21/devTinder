const express = require("express");

//creating an new express application
const app = express();

//This will only handles GET call to /user
app.get("/user",(req,res)=>{
    res.send({firstname:"saurav",lastname: "pawar"});
})

app.post("/user",(req,res)=>{
    //saving data to DB
    res.send("Data saved succesfully!");
})

app.delete("/user",(req,res)=>{
    res.send("Data delete succesfully!");
})

app.patch("/user",(req,res)=>{
    res.send("Data patch succesfully!");
})

//use :- will match all the HTTP methods api call to /test
app.use("/test",(req,res)=>{
    res.send("test page!");
})


app.listen(3000);// listen to server on PORT: 3000