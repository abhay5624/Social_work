const mongoose = require("mongoose");
const Bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
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
    avatar: {
        type: String,
        default: false
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
        console.log("from registraion", user.password);
        const saltRound = await Bcryptjs.genSalt(10);
        const hash_password = await Bcryptjs.hash(user.password,saltRound)
        user.password= hash_password;
    }catch (error){
        next(error);
    }
 })
student.methods.ComparePassword = async function(password) {
    return await Bcryptjs.compare(password, this.password);
}
student.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d"
        })
    } catch (error) {
        console.log("from Token: ",error);   
    }
}
const Register = new mongoose.model("Student",student);
module.exports=Register;