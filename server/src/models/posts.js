const mongoose = require("mongoose");
const userposts = new mongoose.Schema({
    postImg: {type: String},
    userID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})


const userPostmessage = new mongoose.model("student_Posts",userposts);
module.exports= userPostmessage;