const RegisterPost = require("../models/registration");
const ProfilePost = require("../models/profile")

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
const ProfileGet = async (req, res) => {
try {
   const userprofile = req.profile;
    return res.status(200).json({ userprofile});
} catch (error) {
  console.log(`error from the profile get ${error}`);
}
};
const profileAdd = async(req,res) => {
  console.log("an profile updation ",req.body)
  const {id,avatar,background,headLine,discription} =req.body;
  const profileExist = await ProfilePost.findOne({ id });
  if(!profileExist){
    try {
      const profileCreate = await ProfilePost.create({id,avatar,background,headLine,discription});
      console.log(profileCreate);
      res
      .status(201)
      .json({
        message: "profile creation Successful",
      });
    } catch (error) {
      res
      .status(500)
      .json({
        message: error,
      });
    }   
  }
  else{
    try {
      const result = await ProfilePost.updateOne({_id: profileExist._id},{
        $set: {
          avatar,background,headLine,discription
        }
    });
    console.log(result);
    res
      .status(201)
      .json({
        message: "profile updated Successful",
      });
    } catch (error) {
      res
      .status(500)
      .json({
        message: "error from update",
      });
    }
      
  }
  
}
const register_post = async (req, res) => {
  try {
    const { firstName, phoneNo, email, password, avatar } = req.body;
    console.log("req body is: ",req.body);
    const userExist = await RegisterPost.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "email already exit" });
    }
    console.log("req body is: ",req.body);
    const UserCreater = await RegisterPost.create({
      firstName,
      phoneNo,
      email,
      password,
      avatar
    });
    console.log(UserCreater);
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
};
const user = async (req,res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData})
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};



module.exports = { home, register, register_post,Login_Post,user,profileAdd,ProfileGet };
