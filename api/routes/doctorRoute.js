const express = require('express');
const router = express.Router();

// controllers
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const doctorController = require('../controllers/doctorController');

// Add Doctor
router.route('/doctor/add/:userId')
    .post(authController.requireSignIn, authController.isAuth, authController.isAdmin, doctorController.createDoctor);

// Update or Delete Doctor
// router.route('/doctor/:doctorId/:userId')
//     .put(authController.requireSignIn, authController.isAuth, authController.isAdmin, doctorController.updateDoctor)
//     .delete(authController.requireSignIn, authController.isAuth, authController.isAdmin, doctorController.deleteDoctor);


// find doctor by ID
router.param('doctorId', doctorController.doctorById);

// find user by ID
router.param('userId', userController.userById);

module.exports = router;
