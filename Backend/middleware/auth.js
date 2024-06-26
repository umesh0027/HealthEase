

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

// Configuring dotenv to load environment variables from .env file
dotenv.config();

// Middleware function to authenticate user requests
exports.auth = async (req, res, next) => {
    try {
        // Extracting JWT from request cookies, body, or header
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        // If JWT is missing, return 401 Unauthorized response
        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }

        try {
            // Verifying the JWT using the secret key stored in environment variables
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            // Storing the decoded JWT payload in the request object for further use
            req.user = decode;
            
        } catch (error) {
            // If JWT verification fails, return 401 Unauthorized response
            console.error("Error verifying token:", error);
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }

        // If JWT is valid, move on to the next middleware or request handler
        next();
    } catch (error) {
        // If there is an error during the authentication process, return 401 Unauthorized response
        console.error("Error during authentication:", error);
        return res.status(401).json({
            success: false,
            message: `Something Went Wrong While Validating the Token`,
        });
    }
};

// Middleware function to check if user is an admin
exports.isAdmin = async (req, res, next) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });

        if (userDetails?.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Admin",
            });
        }
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};

// Middleware function to check if user is a patient
exports.isPatient = async (req, res, next) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });

        if (userDetails?.accountType !== "Patient") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Patient",
            });
        }
        req.userId = userDetails._id;
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};

// Middleware function to check if user is a doctor
exports.isDoctor = async (req, res, next) => {
    try {
       
    
        const userDetails = await User.findOne({ email: req.user.email });

        if (userDetails?.accountType !== "Doctor") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Doctor",
            });
        }
         // Set userId in request object
         req.userId = userDetails._id;
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `User Role Can't be Verified` });
    }
};



