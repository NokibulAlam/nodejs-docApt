const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        
    },
    specialization: {
        type: String,
        required: true
    },
    consultancyFee: {
        type: Number,
        required: true
    },
    fromTime: {
        type: String,
        required: true
    },
    toTime: {
        type: String,
        required: true
    }
}, { timestamps: true});

module.exports = mongoose.model("Doctors", doctorSchema);