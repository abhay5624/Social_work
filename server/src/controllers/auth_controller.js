const RegisterPost = require("../models/registration")
const Bcryptjs = require("bcryptjs");
const home = async (req,res) =>{
    try{
        res
            .status(200)
            .send(
                "Hello from APP"
                )
    }catch(error){
        console.log(error);
    }
};
const register = async (  req,res) => {
    try{
        res.status("200")
        .send(
            "welcome to registratio page"
        )
    }catch(error){
        resizeBy.status(400).send({msg: "page not found"})
        console.log(error);
    }
   
};

const register_post = async (req,res) => {
    try{
        const { firstName,phoneNo,email,password} =req.body;
        const userExist = await RegisterPost.findOne({email});
        if(userExist){
            return res.status(400).json({msg: "email already exit"});
        }
        const saltRound = 10;
        const hash_password = await Bcryptjs.hash(password,saltRound)
        const UserCreater = await RegisterPost.create({firstName,phoneNo,email,password:hash_password})
        console.log(req.body);
        res.status(200).send({message: UserCreater});    
    }catch (error){
        console.log(error);
        res.status(400).send(error);
    }
}
module.exports = {home,register,register_post}