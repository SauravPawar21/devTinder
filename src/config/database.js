const mongoose = require("mongoose");

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://Nodedev:e0PZyzCq2cnY3oxF@namastenode.dy1nk8n.mongodb.net/devTinder");
}

module.exports = connectDB;