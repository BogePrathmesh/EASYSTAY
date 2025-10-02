const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportlocalmongoose = require("passport-local-mongoose");


//passportlocalmongoose will automatically define the username and password with hased and slat value so no need to define it

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
});

userSchema.plugin(passportlocalmongoose);//this is will create the Hashed and Salted USername and password

module.exports = mongoose.model("User",userSchema);