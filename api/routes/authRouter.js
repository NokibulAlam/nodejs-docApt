const express = require('express');
const router = express.Router();

// controllers
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// user SignUp
router.route('/signup')
    .post(authController.postSignup);


// user Signin
router.route('/signin')
    .post(authController.postSingin);


// user Sign-out
router.route('/signout')
    .get(authController.getSingout);


module.exports = router;
