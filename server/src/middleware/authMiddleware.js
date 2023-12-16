const jwt = require('jsonwebtoken');
const User = require("../models/registration");
const authMiddleware = async(req, res,next) => {
    const token = req.header("Authorization");
    const jwtToken =token.replace("Bearer ","");
    try {
        const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({ email: isVerified.email}).select({
            password: 0,
        })
        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        console.log("get request successfull");
        next();  
    } catch (error) {
        return res 
        .status(401)
        .json({message: "Unauthorized HTTP, Token not provided"}); 
    }
    
};
module.exports = authMiddleware;