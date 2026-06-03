require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");

app.use(cookieparser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("Database connection Established...");
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database cannot be connected!");
  });
