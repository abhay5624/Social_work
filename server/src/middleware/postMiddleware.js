const jwt = require('jsonwebtoken');
const userPosts = require("../models/posts")
const profileMiddleware = async(req, res,next) => {
    const token = req.header("Authorization");
    const jwtToken =token.replace("Bearer ","");
    try {
        const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
        if(isVerified){
            req.userId = isVerified.userId;
            next(); 
        }else{
            return res 
            .status(401)
            .json({message: "Unauthorized HTTP, Token not provided"}); 
        } 
    } catch (error) {
        return res 
        .status(401)
        .json({message: "Unauthorized HTTP, Token not provided"}); 
    }
    
};
module.exports = profileMiddleware;