const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const H_user = require('../models/userModel')
const cookieParser = require("cookie-parser")
const express = require("express");
const {createToken} = require("../middleware/Auth")
const app = express();
app.use(cookieParser)


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // if (!username || !email || !password) {
    //     res.status(400)
    //     throw new Error("All fields are required!!")
    // };
    const userAvailable = await H_user.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User already Exsists")
    }
    //  password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed Password: ",hashedPassword);
    const user = H_user.create({
        username,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("User data is not Valid")
    }
    res.json({ message: "Register the user" });
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required!!")
    };

    const user = await H_user.findOne({ email });
    if(!user) {
        res.status(400);
        throw new Error("User doesn't Exists")
    }
    const realPassword = user.password;
    if (user && (bcrypt.compare(password, realPassword))) {
        const accessToken = createToken(user);

        res.cookie("token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: true,
        })
        res.json("Logged In");
        }
        else {
        res.status(401)
        throw new Error("email or password is not valid")
    }
    
})

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})

const getAllUsers = asyncHandler(async (req,res) => {
    const users = await H_user.find({});
    
    if(users){
        res.status(200).json(users);
    } else {
        res.send("No Users to Show");
    }
})


module.exports = { registerUser, loginUser, currentUser,getAllUsers }