const adminAuth = (req,res,next)=>{
    console.log("Admin is geting chcked");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
};
const userAuth = (req,res,next)=>{
    console.log("user is geting chcked");
    const token = "xykjhz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
};

module.exports= {
    adminAuth,
    userAuth,
}