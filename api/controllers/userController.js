const User = require('../models/Users');

// find user by ID
exports.userById = (req, res, next, id) => {
    User.findById(id)
        .exec((err, user) => {
            if(err || !user) {
                return res.status(400).json({
                    error: "User Not Found",
                });
            }
            req.profile = user;
            next();
        });
};