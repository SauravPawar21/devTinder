
const mongoose = require("mongoose");

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
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxLength: 8,
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

module.exports = mongoose.model("User",userSchema);