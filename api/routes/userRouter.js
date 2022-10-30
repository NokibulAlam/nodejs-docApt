const express = require('express');
const router = express.Router();
const moment = require('moment');

// controllers
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// models
const Appointment = require('../models/Appointment');

// User SignUp Routing
router.route("/user/:userId")
    .get(authController.requireSignIn, authController.isAuth, authController.isAdmin, (req, res, next) => {
        return res.json({
            user: req.profile
        });
    });


router.post('/appointment/book/:userId', authController.requireSignIn, authController.isAuth, async(req, res) => {
    try {
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString();

        const appointment = new Appointment(req.body);
        await appointment.save();

        res.status(200).json({
            message: "Appointment Booked Successfully"
        });
    } catch (error) {
        res.status(500).json({
            Error: "Error Booking Appointment",
            error
        });
    }
});


// find user by ID
router.param('userId', userController.userById);

module.exports = router;
