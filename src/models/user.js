
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 50,
  },
  emailId: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid emial address"+value);
      }
    }
  },
  password: {
    type: String,
    required: true,
     validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Enter an strong password:" + value);
      }
    }
  },
  age: {
    type: Number,
    min: 18,
    max:100,
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","other"].includes(value)){
        throw new Error("gender is not valid!!")
      }
    }
  },
  photoUrl: {
    type: String,
    default: "https://t4.ftcdn.net/jpg/02/44/43/69/240_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid photo URL:" + value);
      }
    }
  },
  about: {
    type: String,
    default: "This is about the default user!!",
  },
  skills: {
    type: [String],
  },
  
},
{
  timestamps: true,
}
);

userSchema.methods.getJWT= async function(){
  const user = this;

   const token = await jwt.sign({_id: user._id}, "DEV@Tinder@91",{expiresIn: "1d"});

   return token;
}

userSchema.methods.validtePassword= async function(passwordInputByUser){
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
  return isPasswordValid;
}
module.exports = mongoose.model("User",userSchema);