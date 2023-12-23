const mongoose = require("mongoose");
const date = new Date;
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
    },
    tags: {
        type: [String],
    },
    day: {
        type: String,
         
    },
    month: {
        type: String,
         
    },
    year: {
        type: String,
         
    }
})


const userPostmessage = new mongoose.model("student_Posts",userposts);
module.exports= userPostmessage;