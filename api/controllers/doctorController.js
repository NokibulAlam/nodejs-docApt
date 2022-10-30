const Doctor = require('../models/Doctor');

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

// Update Doctor
