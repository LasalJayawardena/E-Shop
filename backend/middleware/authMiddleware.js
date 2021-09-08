import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


const protect =  asyncHandler( async (req, res, next) => {
    let token;

    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // dont get password
            req.user = await User.findById(decoded.id).select('-password'); 
                   

            next();
            return;

        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if(!token){
        // unauthorized
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    next();
});

export {
    protect
};