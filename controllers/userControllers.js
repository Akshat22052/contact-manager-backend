


const asyncHandler = require('express-async-handler');

const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModels = require('../models/userModels');




const RegisterUser = asyncHandler( async(req,res) => {
    const {name,email,password} = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please provide all fields");
    }
    const checkEmail = await User.findOne({email});
    if (checkEmail){
        res.status(404);
        throw new Error("THis email already exist!");
    }
    const hashPassword = await bcrypt.hash(password, 10); // Use `bcrypt.hash` instead of `bcrypt`
    console.log("hashpassword: ",hashPassword);
    const newUser = await User.create({
        name,
        email,
        password:hashPassword
    });
    if (newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    }
    else {
        res.status(400);
        throw new Error("not able to register user!" );
    }
});




const LoginUser = asyncHandler(async(req,res) => { 
    const {email,password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide all fields");
    }
    const checkUser = await User.findOne({email});
    if (checkUser && await bcrypt.compare(password,checkUser.password)) {
        const accessToken = jwt.sign({
            user:{
                name : checkUser.name,
                email: checkUser.email,
                id :checkUser._id
            }
        }, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"1m"
        }
    )
    res.status(200).json(accessToken);
    }
    else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
}
);

const CurrentUser = asyncHandler(async(req,res) => {
    res.status(200).json({
        message: "Hello from the current user route"
    }) 
}
);





module.exports = {
    RegisterUser,LoginUser,CurrentUser
}

