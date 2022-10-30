const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    doctorId: {
        type: ObjectId,
        ref: "Doctors",
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Appointment", appointmentSchema);