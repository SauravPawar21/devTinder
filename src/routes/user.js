const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { populate } = require("../models/user");
const userRouter = express.Router();

//Get all the pending connection request for the loggedIn User.
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId",
            "firstName lastName photoUrl age gender about skills"
        );

        res.json({message: "Data fetched successfully!",data: connectionRequests,})
    } catch (err) {
        res.status(400).send("Error :" + err.message );
    }
})

module.exports=userRouter;