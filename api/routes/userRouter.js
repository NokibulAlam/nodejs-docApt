const express = require('express');
const router = express.Router();

// controllers
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// User SignUp Routing
router.route("/user/:userId")
    .get(authController.requireSignIn, authController.isAuth, authController.isAdmin, (req, res, next) => {
        return res.json({
            user: req.profile
        });
    });


// find user by ID
router.param('userId', userController.userById);

module.exports = router;
