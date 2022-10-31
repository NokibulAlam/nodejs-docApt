const Doctor = require('../models/Doctor');

/* Internal Import */
const {errorHandler} = require('../helpers/ErrorHandler');

exports.createDoctor = (req, res, next) => {
    const doctor = new Doctor(req.body);
    // console.log(doctor);
    doctor.save((err, result) => {
        if(err) {
            console.log(err);
        }
        return res.json({
            message: "Doctor Created Successfully"
        });
    });
};


// Find Doctor By Id
exports.doctorById = (req, res, next, id) => {
    Doctor.findById(id)
        .exec((err, doctor) => {
            if(err || !doctor) {
                return res.status(400).json({
                    error: "Doctor Not Found"
                });
            }
            req.doctor = doctor;
            next();
        });
};


// Fetch Single Doctor
exports.realSingleDoctor = (req, res, next) => {
    return res.json(req.doctor);
};


// Fetch All Doctor
exports.realAllDoctor = (req, res, next) => {
    Doctor.find()
        .exec((err, doctors) => {
            if(err) return res.status(400).json({
                error: errorHandler(err)
            });
            return res.json(doctors);
        });
};
