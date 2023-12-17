const mongoose = require("mongoose");
const userProfile = new mongoose.Schema({
    id: {
        type: String,
    },
    avatar: {
        type: String
    },
    background: {
        type: String
    },
    headLine: {
        type: String
    },
    discription: {
        type: String,
    }
});


const UserProfile = new mongoose.model("Student_Profile",userProfile);
module.exports=UserProfile;