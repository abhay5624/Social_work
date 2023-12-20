const RegisterPost = require("../models/registration");
const ProfilePost = require("../models/profile")
const userPostmessage = require("../models/posts");
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
    res.status(400).send({ msg: "page not found" });
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
  const {id,avatar,background,headLine,discription} =req.body;
  const profileExist = await ProfilePost.findOne({ id });
  if(!profileExist){
    try {
      const profileCreate = await ProfilePost.create({id,avatar,background,headLine,discription});
      const result = await RegisterPost.updateOne({_id: profileExist._id},{
        $set: {
          avatar
        }});
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
    
    const userExist = await RegisterPost.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "email already exit" });
    }
    
    const UserCreater = await RegisterPost.create({
      firstName,
      phoneNo,
      email,
      password,
      avatar
    });
   
    res
      .status(201)
      .json({
        message: "Registration Successful",
        token: await UserCreater.generateToken(),
        userId: UserCreater._id.toString(),
      });
  } catch (error) {
    
    res.status(500).json("internal server error");
  }
};
const Login_Post = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userExist = await RegisterPost.findOne({ email });
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
const userPosts = async (req,res) => {
    try {
      const { postImg, title, description,tags} = req.body;
      const PostCreation = await userPostmessage.create({
        userID: req.userId, postImg, title, description,tags
      });
      res.status(201)
      .json({
        message: "Post created Successful",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error from post route"
      })
    }
}
const GetProfile = async (req,res) => {
try {
  const PostToSend = await userPostmessage.find({userID: req.userId});
  if(PostToSend){
      res.status(200).json({PostToSend});
  }else{
    res.status(404).json({
      msg: "Posts not found"
    })
  }
} catch (error) {
  res.status(404).json({
    msg: "Posts not found"
  })
}
}
const GetAllPost = async (req,res) => {
  try {
    const posts = await userPostmessage.find();
    res.status(200).json({posts});
  } catch (error) {
    res.status(500).json({msg: "unauthorized user"});
  }
 
}
const SearchPersonHandle = async (req,res) => {
  try {
    const type = req.query.name+"@nitjsr.ac.in";
    
    const User = await RegisterPost.findOne({email: type}).select({password: 0});
    const PostToSend = await ProfilePost.findOne({id: User._id});
    res.status(200).json({User,PostToSend});
  } catch (error) {
    console.log(error);
    res.status(404).json({msg: "user not found"})
  }
}
const SearchPostHandle = async (req,res) => {
    const type = req.query.name;

}
const PostDelete = async (req,res) => {
  const posts = await userPostmessage.findOne({_id: req.body.id});
  console.log("Posts deleted :",posts.userID);
    try {
      if(req.body.userId== posts.userID){
        const result = await userPostmessage.deleteOne({ _id: req.body.id });
        if (result.deletedCount === 1) {
          res.status(200).json({ message: 'Document deleted successfully' });
        } else {
          res.status(404).json({ message: 'Document not found' });
        }
      }else{
        res.status(500).json({msg: "unauthorized to delete this post"})
      }
      
    } catch (error) {
      
    }
}
module.exports = { home,PostDelete,SearchPersonHandle,SearchPostHandle, register, register_post,Login_Post,user,profileAdd,ProfileGet, userPosts,GetProfile,GetAllPost};
