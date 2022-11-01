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
        // req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        // req.body.time = moment(req.body.time, "HH:mm").toISOString();
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

router.post("/appointment/availability", async(req, res) => {
    try {
        // const date = moment(req.body.date).toISOString();
        // const fromTime = moment(req.body.time).subtract(1, "hours").toISOString();
        // const toTime = moment(req.body.time).add(1, "hours").toISOString();

        // console.log(fromTime, toTime);
        
        const {userId, doctorId, date, time} = req.body;
        // const aptDate = moment(date, "DD-MM-YYYY").toString();
        const aptDate = date.toString("DD-MM-YYYY");
        // const fromTime = moment(time, "HH:mm");
        // const toTime = moment(time, "HH:mm").add(1, "hours");
        // const aptTime = moment(time, "HH:mm").toString();
        const aptTime = time.toString();
        console.log(aptDate, aptTime);

        const appointment = await Appointment.find({
            doctorId,
            aptDate,
            aptTime
        });
        console.log(appointment);
        if(appointment.length > 0) {
            return res.json({ Error: "Appointment not Available"});
        }
        else {
            return res.json({ message: "Appointment Available"})
        }
    } catch (error) {
        
    }
})


// find user by ID
router.param('userId', userController.userById);

module.exports = router;
