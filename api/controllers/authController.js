const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const expressJWT = require("express-jwt");

// error handler
const { errorHandler } = require('../helpers/ErrorHandler');


// 
exports.requireSignIn = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: ['auth'],
});

// Check if the user is Admin
exports.isAuth = (req, res, next) => {
    const user = req.profile && req.auth && req.profile._id == req.auth.id;

    if (!user) {
        return res.status(403).json({
            error: "Access Denied",
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin Resouse Access Denied",
        });
    }
    next();
};


// SignUp Module
exports.postSignup = (req, res, next) => {
    const user = new User(req.body);

    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            });
        } else {
            user.salt = undefined;
            user.hashedPassword = undefined;
            return res.status(200).json({
                message: "User Created Successfully",
            });
        }
    });
};

// Sign In Module
exports.postSingin = (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Email is not registered.",
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email or Password do not match.",
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { expire: new Date() + 9999 });

        const {_id, name, role} = user;
        return res.json({
            token,
            user: {_id, name, role}
        });
    });
};

// Sign-out Module
exports.getSingout = (req, res, next) => {
    res.clearCookie('token');

    return res.json({
        message: "Signout Successfull",
    });
};

