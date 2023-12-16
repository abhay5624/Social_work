const RegisterPost = require("../models/registration");
const Bcryptjs = require("bcryptjs");
const home = async (req, res) => {
  try {
    res.status(200).send("Hello from APP");
  } catch (error) {
    console.log(error);
  }
};
const register = async (req, res) => {
  try {
    res.status("200").send("welcome to registratio page");
  } catch (error) {
    resizeBy.status(400).send({ msg: "page not found" });
    console.log(error);
  }
};



const register_post = async (req, res) => {
  try {
    const { firstName, phoneNo, email, password } = req.body;
    const userExist = await RegisterPost.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "email already exit" });
    }
    const UserCreater = await RegisterPost.create({
      firstName,
      phoneNo,
      email,
      password,
    });
    res
      .status(201)
      .json({
        message: "Registration Successful",
        token: await UserCreater.generateToken(),
        userId: UserCreater._id.toString(),
      });
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};


const Login_Post = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userExist = await RegisterPost.findOne({ email });
        console.log(userExist);
        if(!userExist){
            return res.status(400).json({message: " invalid Credentials"});
        }
        if(userExist.ComparePassword(password)){
            res
            .status(201)
            .json({
              message: "Login Successful",
              token: await userExist.generateToken(),
              userId: userExist._id.toString(),
            });
        }else{
            res.status(401).json({message: "invalid email or password"});
        }

    } catch(error){
        res.status(500).json("internal server error");

    }
}

const user = async (req,res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData})
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
}



module.exports = { home, register, register_post,Login_Post,user };
