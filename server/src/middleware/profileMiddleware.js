const jwt = require('jsonwebtoken');
const UserProfile = require('../models/profile');
const profileMiddleware = async(req, res,next) => {
    const token = req.header("Authorization");
    const jwtToken =token.replace("Bearer ","");
    try {
        const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
        const profile = await UserProfile.findOne({id: isVerified.userId});
        console.log(isVerified);
        req.profile = profile;
        next();  
    } catch (error) {
        return res 
        .status(401)
        .json({message: "Unauthorized HTTP, Token not provided"}); 
    }
    
};
module.exports = profileMiddleware;