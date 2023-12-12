const mongoose = require("mongoose");
const Bcryptjs = require("bcryptjs");

const student = new mongoose.Schema({
    firstName: {
        type:String,
        required: true
    },
    phoneNo: {
        type:Number,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required:true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})
 student.pre('save',async function(){
    const user = this;

    if(!user.isModified("password")){
        next();
    }
    try{
        const saltRound = await Bcryptjs.genSalt(10);
        const hash_password = await Bcryptjs.hash(user.password,saltRound)
        user.password= hash_password;
    }catch (error){
        next(error)
    }
 })

const Register = new mongoose.model("Student",student);
module.exports=Register;