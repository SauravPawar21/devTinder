const express = require("express");

//creating an new express application
const app = express();

app.use("/test",(req,res)=>{
    res.send("hellow from the Server!");
})
app.listen(3000);// listen to server on PORT: 3000