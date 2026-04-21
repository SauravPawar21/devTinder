const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signUp", async (req, res) => {
  //creating an new instance of the user modle
  
  const user = new User(req.body);
//   const user = new User({
//     firstName: "virat",
//     lastName: "kohli",
//     emailId: "virat@kohli.com",
//     password: "virat@213",
//   });
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
