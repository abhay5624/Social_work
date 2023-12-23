const RegisterPost = require("../models/registration");
const ProfilePost = require("../models/profile")
const userPostmessage = require("../models/posts");
const JSONStream = require('JSONStream');
const ObjectId = require('mongodb').ObjectId;
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
    console.log(posts);
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
  try {
    const tag = req.query.tag;
    const postTag = await userPostmessage.find({tags: { $elemMatch: { $eq: tag } }});
    console.log(postTag);
    res.status(200).json({postTag});
  } catch (error) {
    res.status(500).json({msg: "post not found"});
  }
    
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
 const searchPostByDate = async (req,res) => {
  const dt = new Date;
  const date = dt.toISOString().split('T')[0];
 console.log(date);
  try {      
    const postDates = await userPostmessage.find({date: { $regex: date, $options: 'i' } });
      console.log(postDates);
      if(postDates){
        res.status(200).json(postDates);
      }else{
        res.status(404).json("no post today");
      }

    
  } catch (error) {
    res.status(401).json("internal error occure")
  }
 }

const SearchPostById = async (req, res) => {
  try {
    var id =req.query.id;       
    const data = await userPostmessage.findById(`${id}`);
    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ msg: "Post not found",data });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const updatePost = async (req,res) => {
  try {
      const { id,postImg, title, description,tags} = req.body;

      const update = await userPostmessage.updateOne({_id: id},
      {
        $set: {
            postImg, title, description,tags
        }
      });
      console.log(update);
      //console.log(req.body);
      res.status(201)
      .json({
        message: "Post updated Successful",
      });
  } catch (error) {
    res.status(400)
      .json({
        message: "Post can't be updated",
      });
  }
    

}
const GetAllPostByStream = async () => {
      try {
        const cursor = await userPostmessage.find();
        const jsonStream = JSONStream.stringify();
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Transfer-Encoding', 'chunked');
        await promisify(pipeline)(cursor.stream(), jsonStream, res);
      } catch (error) {
        
      }
}
module.exports = { home,updatePost,searchPostByDate,SearchPostById,GetAllPostByStream,PostDelete,SearchPersonHandle,SearchPostHandle, register, register_post,Login_Post,user,profileAdd,ProfileGet, userPosts,GetProfile,GetAllPost};
