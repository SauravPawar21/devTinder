const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const user = require("./models/user");

app.use(express.json());

//get user by email
app.get("/user",async (req,res)=>{
  const userEmail = req.body.emailId;
  try{
    const user = await User.find({emailId: userEmail})
    res.send(user);
  }
  catch(err){
    res.status(400).send("something went worng")
  }
})

app.post("/signUp", async (req, res) => {
  const user = new User(req.body);
  try {
     await user.save();
  res.send("User Added successfully");
  } catch (err) {
    res.status(400).send("error while saving the user:" + err.message);
  }
});

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
