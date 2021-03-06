import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import generateToken from './../utils/generateToken.js';


// @desc Authenticate user & get a token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) 
        });
    } else{
        // 401 is unauthorized
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc Register a new User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if(userExists){
        // 400 is bad request
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        // 201 is something was created
        res.status(201);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) 
        });
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});



// @desc Get user Profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});


export {
    authUser,
    registerUser,
    getUserProfile,
};