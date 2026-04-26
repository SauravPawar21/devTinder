const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

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
