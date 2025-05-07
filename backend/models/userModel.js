const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required : [true, "Please add user name"]
    },
    email : {
        type: String,
        required: [true,"Please add user email"]
    },
    password : {
        type: String,
        required: [true,"Please enter password"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    user_img: {
        type: String
    },
    liked: {
        type: String
    }, 
},{
    timestamps: true
}
)

module.exports = mongoose.model("H_user",userSchema);