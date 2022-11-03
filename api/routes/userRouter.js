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


router.post('/appointment/book/:userId', authController.requireSignIn, authController.isAuth, async (req, res) => {
    try {
        req.body.date = moment(req.body.date, "DD-MM-YYYY");
        req.body.time = moment(req.body.time, "HH:mm");
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

router.post("/appointment/availability", async (req, res) => {
    try {
        let { userId, doctorId, date, time } = req.body;
        date = moment(date, "DD-MM-YYYY");
        const fromTime = moment(time, "HH:mm").subtract(29, "minutes");
        const toTime = moment(time, "HH:mm").add(29, "minutes");

        const appointment = await Appointment.find({
            doctorId,
            date,
            time: {$gte: fromTime, $lte: toTime}
        });
        if (appointment.length > 0) {
            return res.json({ error: "Appointment not Available" });
        }
        else {
            return res.json({ message: "Appointment Available" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error booking appointment",
        });
    }
})


// find user by ID
router.param('userId', userController.userById);

module.exports = router;
